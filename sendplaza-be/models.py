from app import db
from sqlalchemy.inspection import inspect


class Serializer(object):

    def serialize(self):
        return {c: getattr(self, c) for c in inspect(self).attrs.keys()}

    @staticmethod
    def serialize_list(l):
        return [m.serialize() for m in l]


class BolCredential(db.Model, Serializer):
    __tablename__ = 'bolcreadential'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    client_id = db.Column(db.String())
    client_secret = db.Column(db.String())

    def __init__(self, name, client_id, client_secret):
        self.name = name
        self.client_id = client_id
        self.client_secret = client_secret

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def to_dict(self):
        return Serializer.serialize(self)

    def serialize(self):
        d = Serializer.serialize(self)
        d.pop('client_id')
        d.pop('client_secret')
        return d


class PostmenApiKey(db.Model, Serializer):
    __tablename__ = 'postmenapikey'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    key = db.Column(db.String())
    api_url = db.Column(db.String())

    def __init__(self, name, key, api_url):
        self.name = name
        self.key = key
        self.api_url = api_url

    def __repr__(self):
        return '<id {}>'.format(self.id)

    def to_dict(self):
        return Serializer.serialize(self)

    def serialize(self):
        d = Serializer.serialize(self)
        d.pop('key')
        return d
