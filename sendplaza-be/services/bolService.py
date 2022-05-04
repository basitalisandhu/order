import time
from flask import current_app, request
import base64
import requests
import json
from services.common import CommonService
from requests_futures.sessions import FuturesSession


class BolService(CommonService):
    def __init__(self, id):
        from services.dbService import DbService
        db_service = DbService()
        credential = db_service.get_credential_by_id(id)
        self.token = None
        self.api_url = current_app.config["BOL_API"]
        self.credentials = f'{credential["client_id"]}:{credential["client_secret"]}'
        self.login_bol()

    def login_header(self):
        return {'Authorization': f'Basic {base64.b64encode(self.credentials.encode("ascii")).decode("utf-8")}'}

    def api_header(self):
        return {'Authorization': f'Bearer {self.token}', "Accept": "application/vnd.retailer.v7+json",
                "Content-Type": "application/vnd.retailer.v7+json"}

    def login_bol(self):
        r = requests.post('https://login.bol.com/token?grant_type=client_credentials', headers=self.login_header())
        if r.status_code == 200:
            bol_login_res = r.json()
            self.token = bol_login_res['access_token']
        else:
            return self.response("Bol.com login failed. Invalid client id or client secret", r.status_code)

    def get_all_orders(self):
        query_string = request.query_string.decode("utf-8")
        url = '/retailer/orders'
        if query_string:
            url = f'{url}?{query_string}'
        r = requests.get(f'{self.api_url}{url}', headers=self.api_header())
        if r.status_code == 200:
            bol_orders = r.json()
            if not bol_orders.get("orders"):
                return self.response([], 200)
            print(f'Number of orders fetched: {len(bol_orders["orders"])}')
            ids = []
            for order in bol_orders['orders']:
                ids.append(order["orderId"])
            return self.get_order_by_ids(ids)
        else:
            return self.response(r.text, r.status_code)

    def get_order_by_ids(self, ids, response=True):
        from services.postmenService import PostmenService
        postmen_service = PostmenService(None)
        session = FuturesSession()
        orders = []
        reqs = []
        count = 0
        for _id in ids:
            count += 1
            if count % 25 == 0:
                time.sleep(1)
            reqs.append(session.get(f'{self.api_url}/retailer/orders/{_id}', headers=self.api_header()))

        for req in reqs:
            req = req.result()
            if req.status_code == 200:
                res = req.json()
                res['label'] = postmen_service.create_label(res)
                orders.append(res)
            else:
                print(f'Not fetched')
                print(req.json())

        print(f'Number of orders sending: {len(orders)}')
        if response:
            return self.response(orders)
        else:
            return orders

    def get_shipments_by_ids(self, ids, response=True):
        from services.postmenService import PostmenService
        postmen_service = PostmenService(None)
        session = FuturesSession()
        orders = []
        reqs = []
        for _id in ids:
            reqs.append(session.get(f'{self.api_url}/retailer/orders/{_id}', headers=self.api_header()))

        for req in reqs:
            req = req.result()
            if req.status_code == 200:
                res = req.json()
                res['label'] = postmen_service.create_label(res)
                orders.append(res)
        if response:
            return self.response(orders)
        else:
            return orders

    def ship_orders(self, order_items_id, order_id, track_and_trace):
        # order_items = []
        # for orderItemId in order_items_ids:
        #     order_items.append({"orderItemId": orderItemId})
        shipment = {
            "orderItems": [
                {"orderItemId": order_items_id}
            ],
            "shipmentReference": order_id,
            "transport": {
                "transporterCode": "BPOST_BE",
                "trackAndTrace": track_and_trace
            }
        }
        r = requests.put(f'{self.api_url}/retailer/orders/shipment', data=json.dumps(shipment),
                         headers=self.api_header())
        shipped_orders = r.json()
        link = shipped_orders['links'][0]['href']
        r = requests.get(link, headers=self.api_header())
        return r.json()
