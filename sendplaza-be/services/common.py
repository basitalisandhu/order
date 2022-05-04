from flask import jsonify, make_response


class CommonService:
    def __init__(self):
        self.error = False,

    def response(self, data, status_code=200):
        response = make_response(jsonify(data), status_code, )
        response.headers["Content-Type"] = "application/json"
        return response
