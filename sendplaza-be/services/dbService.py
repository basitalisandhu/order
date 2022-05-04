from flask import request
from sqlalchemy.exc import SQLAlchemyError
from services.common import CommonService
from models import BolCredential, PostmenApiKey, Serializer


class DbService(CommonService):

    def create_credential(self):
        from app import db
        data = request.json
        try:
            credential = BolCredential(**data)
            db.session.add(credential)
            db.session.commit()
            db.session.flush()
        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(credential.serialize())

    def get_all_credentials(self):
        try:
            credentials = BolCredential.query.all()

        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(Serializer.serialize_list(credentials))

    def get_credential_by_id(self, id):
        try:
            credential = BolCredential.query.filter_by(id=id).first()

        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return credential.to_dict()

    def delete_credential(self, id):
        from app import db
        try:
            BolCredential.query.filter_by(id=id).delete()
            db.session.commit()
        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(True)

    def create_postmen_key(self):
        from app import db
        data = request.json
        try:
            postmenKey = PostmenApiKey(**data)
            db.session.add(postmenKey)
            db.session.commit()
            db.session.flush()
        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(postmenKey.serialize())

    def get_all_postmen_keys(self):
        try:
            postmenKeys = PostmenApiKey.query.all()

        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(Serializer.serialize_list(postmenKeys))

    def get_postmen_key_by_id(self, id):
        try:
            postmenKey = PostmenApiKey.query.filter_by(id=id).first()

        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return postmenKey.to_dict()

    def delete_postmen_key(self, id):
        from app import db
        try:
            PostmenApiKey.query.filter_by(id=id).delete()
            db.session.commit()
        except SQLAlchemyError as e:
            print(str(e.__dict__))

        return self.response(True)
