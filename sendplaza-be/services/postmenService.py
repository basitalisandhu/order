import time
from flask import current_app, request
import json
import requests
import country_converter as coco
from services.common import CommonService
from requests_futures.sessions import FuturesSession


class PostmenService(CommonService):
    def __init__(self, api_key):
        from services.dbService import DbService
        db_service = DbService()
        self.waitTime = 60
        if api_key:
            postmen = db_service.get_postmen_key_by_id(api_key)
            self.apiKey = postmen['key']
            self.api_url = postmen['api_url']
        self.ship_from = current_app.config["SHIP_FROM"]
        self.shipper_id = current_app.config["BOL_SHIPPER_ACCOUNT_ID"]
        self.parcel = current_app.config["PARCEL"]

    def api_header(self):
        return {'postmen-api-key': self.apiKey, 'content-type': 'application/json'}

    def get_all_shippers(self):
        r = requests.get(f'{self.api_url}/shipper-accounts', headers=self.api_header())

        if r.status_code == 429:
            time.sleep(self.waitTime)
            return self.get_all_shippers()

        if r.status_code == 200:
            response = r.json()
            return self.response(response['data']['shipper_accounts'])
        else:
            return self.response(r.text, r.status_code)

    def create_shipper(self):
        shipper = request.json
        r = requests.post(f'{self.api_url}/shipper-accounts', data=json.dumps(shipper), headers=self.api_header())

        if r.status_code == 429:
            time.sleep(self.waitTime)
            return self.create_shipper()

        if r.status_code == 200:
            response = r.json()
            if response['meta']['code'] == 200:
                return self.response(response['data'])
            else:
                message = ''
                for err in response['meta']['details']:
                    message = message + '. ' + err['info']
                return self.response(message, 400)
        else:
            return self.response(r.text, r.status_code)

    def delete_shipper(self, id):
        r = requests.delete(f'{self.api_url}/shipper-accounts/{id}', headers=self.api_header())

        if r.status_code == 429:
            time.sleep(self.waitTime)
            return self.delete_shipper(id)

        if r.status_code == 200:
            response = r.json()
            if response['meta']['code'] == 200:
                return self.response(response['data'])
            else:
                return self.response(response['meta']['message'], 400)
        else:
            return self.response(r.text, r.status_code)

    def get_all_labels(self):
        query_string = request.query_string.decode("utf-8")
        url = '/labels'
        if query_string:
            url = f'{url}?{query_string}'
        r = requests.get(f'{self.api_url}{url}', headers=self.api_header())

        if r.status_code == 429:
            time.sleep(self.waitTime)
            return self.get_all_labels()

        if r.status_code == 200:
            response = r.json()
            if response['meta']['code'] == 200:
                return self.response(response['data'])
            else:
                return self.response(response['meta'], response['meta']['code'])
        else:
            return self.response(r.text, r.status_code)

    def create_labels(self, bol_id):
        from services.bolService import BolService
        bol_service = BolService(bol_id)
        session = FuturesSession()
        data = request.json
        labels = []
        bulk_label = {
            "async": False,
            "labels": []
        }
        reqs = []
        label_orderItemIds = []
        result = {"labels": [], "errors": []}

        for label in data['labels']:
            label_orderItemIds.append(label.pop('orderItemIds'))
            reqs.append(session.post(f'{self.api_url}/labels', data=json.dumps(label), headers=self.api_header()))

        for r, orderItemIds in zip(reqs, label_orderItemIds):
            r = r.result()
            label = json.loads(r.request.body)
            if r.status_code == 200:
                response = r.json()
                if response['meta']['code'] == 200:
                    response['shipping'] = []
                    try:
                        for orderItemId in orderItemIds:
                            response['shipping'].append(bol_service.ship_orders(orderItemId, label['references'][0],
                                                                                response['data']['tracking_numbers'][
                                                                                    0]))
                    except:
                        result["errors"].append(
                            f'Order Number: {label["order_number"]} label shipment failed reason -> Bol.com Api timeout')
                        pass

                    bulk_label['labels'].append({"id": response['data']['id']})
                else:
                    message = ''
                    for err in response['meta']['details']:
                        message = message + '. ' + err['info']
                    result["errors"].append(
                        f'Order Number: {label["order_number"]} label creation failed reason -> {message}')

                    # return self.response(message, 400)
                labels.append(response)

        result["labels"] = labels

        if len(bulk_label['labels']) > 1:
            r = requests.post(f'{self.api_url}/bulk-downloads', data=json.dumps(bulk_label), headers=self.api_header())
            if r.status_code == 429:
                time.sleep(self.waitTime)
                r = requests.post(f'{self.api_url}/bulk-downloads', data=json.dumps(bulk_label),
                                  headers=self.api_header())

            if r.status_code == 200:
                response = r.json()
                if response['meta']['code'] == 200:
                    result['bulk_label'] = response['data']
                else:
                    message = ''
                    for err in response['meta']['details']:
                        message = message + '. ' + err['info']
                    return self.response(message, 400)
        else:
            result['bulk_label'] = labels[0]['data']
        return self.response(result)

    def get_labels_by_orders(self, orders):
        session = FuturesSession()
        labels = []
        reqs = []
        for order in orders:
            label = self.create_label(order)
            print(json.dumps(label))
            reqs.append(session.post(f'{self.api_url}/labels', data=json.dumps(label), headers=self.api_header()))

        for req in reqs:
            req = req.result()
            if req.status_code == 200:
                res = req.json()
                labels.append(res)

        return self.response(labels)

    def create_label(self, order):
        items = []
        orderItemIds = []
        references = [order['orderId']]
        iso2_codes = coco.convert(names=[order["shipmentDetails"].get("countryCode")], to='ISO3')
        order["shipmentDetails"]["countryCode"] = iso2_codes

        for orderItem in order['orderItems']:
            item = {
                "description": orderItem["product"]["title"],
                "origin_country": self.ship_from["country"],
                "quantity": orderItem["quantity"],
                "price": {
                    "amount": orderItem["unitPrice"],
                    "currency": "EUR"
                },
                "weight": self.parcel["item_weight"]
            }
            # references.append(orderItem["orderItemId"])
            orderItemIds.append(orderItem["orderItemId"])
            items.append(item)

        label = {
            "async": False,
            "billing": {
                "paid_by": "shipper"
            },
            "customs": {
                "purpose": "gift"
            },
            "service_type": "bpost_bpack_bus",
            "paper_size": "4x6",
            "shipper_account": {"id": self.shipper_id},
            "shipment": {
                "ship_from": self.ship_from,
                "ship_to": {
                    "contact_name": f'{order["shipmentDetails"].get("firstName", "")} {order["shipmentDetails"].get("surname", "")}',
                    "company_name": order["shipmentDetails"].get("company"),
                    "street1": f'{order["shipmentDetails"].get("streetName")} {order["shipmentDetails"].get("houseNumber", "")} {order["shipmentDetails"].get("houseNumberExtension", "")} {order["shipmentDetails"].get("extraAddressInformation", "")}'.strip(),
                    "city": order["shipmentDetails"].get("city"),
                    "postal_code": order["shipmentDetails"].get("zipCode"),
                    "country": order["shipmentDetails"].get("countryCode"),
                    "email": order["shipmentDetails"].get("email"),
                    "type": "residential"
                },
                "parcels": [{
                    "box_type": self.parcel["box_type"],
                    "dimension": self.parcel["dimension"],
                    "items": items
                }],
            },
            "return_shipment": False,
            "order_number": order['orderId'],
            "references": references,
            "orderItemIds": orderItemIds

        }
        if not label['shipment']['ship_to']['company_name']:
            label['shipment']['ship_to'].pop('company_name')
        return label
