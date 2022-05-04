import os
from flask import Flask
from flask_jwt import JWT, jwt_required
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import config
from services.bolService import BolService
from services.postmenService import PostmenService
from auth import authenticate, identity

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
conf = config[os.environ.get('ENVIRONMENT', 'staging')]
app.config.from_object(conf)
db = SQLAlchemy(app)
jwt = JWT(app, authenticate, identity)


@app.route('/orders/<id>')
@jwt_required()
def get_open_orders(id):
    bol_service = BolService(id)
    return bol_service.get_all_orders()


@app.route('/shippers/<postmen_key>')
@jwt_required()
def get_all_shippers(postmen_key):
    postmen_service = PostmenService(postmen_key)
    return postmen_service.get_all_shippers()


@app.route('/shippers/<postmen_key>', methods=['POST'])
@jwt_required()
def create_shipper(postmen_key):
    postmen_service = PostmenService(postmen_key)
    return postmen_service.create_shipper()


@app.route('/shippers/<postmen_key>/<id>', methods=['DELETE'])
@jwt_required()
def delete_shipper(postmen_key, id):
    postmen_service = PostmenService(postmen_key)
    return postmen_service.delete_shipper(id)


@app.route('/labels/<postmen_key>')
@jwt_required()
def get_all_labels(postmen_key):
    postmen_service = PostmenService(postmen_key)
    return postmen_service.get_all_labels()


@app.route('/orders/<id>/<order_id>')
# @jwt_required()
def get_open_order(id, order_id):
    bol_service = BolService(id)
    return bol_service.get_order_by_ids([order_id])


@app.route('/labels/<postmen_key>/<bol_id>', methods=['POST'])
@jwt_required()
def label_by_ids(postmen_key, bol_id):
    postmen_service = PostmenService(postmen_key)
    return postmen_service.create_labels(bol_id)


@app.route('/credentials', methods=['POST'])
@jwt_required()
def create_credential():
    from services.dbService import DbService
    db_service = DbService()
    return db_service.create_credential()


@app.route('/credentials/<id>', methods=['DELETE'])
@jwt_required()
def delete_credential(id):
    from services.dbService import DbService
    db_service = DbService()
    return db_service.delete_credential(id)


@app.route('/credentials')
@jwt_required()
def get_all_credentials():
    from services.dbService import DbService
    db_service = DbService()
    return db_service.get_all_credentials()


@app.route('/postmenKeys', methods=['POST'])
@jwt_required()
def create_postmen_key():
    from services.dbService import DbService
    db_service = DbService()
    return db_service.create_postmen_key()


@app.route('/postmenKeys/<id>', methods=['DELETE'])
@jwt_required()
def delete_postmen_key(id):
    from services.dbService import DbService
    db_service = DbService()
    return db_service.delete_postmen_key(id)


@app.route('/postmenKeys')
@jwt_required()
def get_all_postmen_key():
    from services.dbService import DbService
    db_service = DbService()
    return db_service.get_all_postmen_keys()


# if __name__ == '__main__':
#     app.run()
