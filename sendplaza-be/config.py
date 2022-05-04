import os
from datetime import timedelta
# Define the application directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
env = os.environ


class Config(object):
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    JWT_EXPIRATION_DELTA = timedelta(days=1)
    SECRET_KEY = '2406?Cr=TBUPC{KTo{sKceu9LEBD%b'
    BOL_API = env.get("BOL_API", "https://api.bol.com")
    POSTMEN_API = env.get("POSTMEN_API", "https://sandbox-api.postmen.com/v3")
    POSTMEN_API_KEY = env.get("POSTMEN_API_KEY", "c9a12271-dcdb-4596-83c5-e84361c501db")
    BOL_SHIPPER_ACCOUNT_ID = env.get("BOL_SHIPPER_ACCOUNT_ID", "c104be66-942b-4467-b120-7b71c0930905")
    SHIP_FROM = {
        "country": "BEL",
        "contact_name": "R Mohamad",
        "phone": "0031620376842",
        "email": "info@phonecompleet.nl",
        "company_name": "P/A BX VNM - Phonecompleet",
        "street1": "Vilvoordsesteenweg 233",
        "city": "Brussel X",
        "state": "Belgie",
        "postal_code": "1099",
        "type": "business"
    }

    SHIPPER_ACCOUNT = {
        "id": "c104be66-942b-4467-b120-7b71c0930905"
    }

    PARCEL = {
        "box_type": "custom",
        "dimension": {
            "width": 20,
            "height": 40,
            "depth": 40,
            "unit": "cm"
        },
        "item_weight": {
            "value": 0.0001,
            "unit": "g"
        }
    }

    @staticmethod
    def init_app(app):
        pass


class ProductionConfig(Config):
    """Statement for enabling the production environment"""
    POSTMEN_API = env.get("POSTMEN_API", "https://production-api.postmen.com/v3")
    POSTMEN_API_KEY = env.get("POSTMEN_API_KEY", "c4a12d91-afeb-4361-8fcb-7f39469a4865")

    BOL_CLIENT_ID = env.get("BOL_CLIENT_ID", "da09e4c0-0d54-450a-a1c1-90861de47ff4")
    BOL_CLIENT_SECRET = env.get("BOL_CLIENT_SECRET",
                                "ZTNTV71hxT-M3cTDVKJkFR9L5KmP11lbuWjSmARXhwkNZM-9muwvvK4rylcFxbA_wDcofobOm-8ltXLmYWSKAA")
    BOL_SHIPPER_ACCOUNT_ID = env.get("BOL_SHIPPER_ACCOUNT_ID", "c02859a4-d6fb-49eb-9ad2-c8ea675fa31b")


class StagingConfig(Config):
    """Statement for enabling the staging environment"""
    DEBUG = True
    BOL_CLIENT_ID = env.get("BOL_CLIENT_ID", "da09e4c0-0d54-450a-a1c1-90861de47ff4")
    BOL_CLIENT_SECRET = env.get("BOL_CLIENT_SECRET",
                                "ZTNTV71hxT-M3cTDVKJkFR9L5KmP11lbuWjSmARXhwkNZM-9muwvvK4rylcFxbA_wDcofobOm-8ltXLmYWSKAA")

    # BOL_SHIPPER_ACCOUNT_ID = env.get("BOL_SHIPPER_ACCOUNT_ID", "c02859a4-d6fb-49eb-9ad2-c8ea675fa31b")
    # POSTMEN_API = env.get("POSTMEN_API", "https://production-api.postmen.com/v3")
    # POSTMEN_API_KEY = env.get("POSTMEN_API_KEY", "c4a12d91-afeb-4361-8fcb-7f39469a4865")


class DevelopmentConfig(Config):
    """Statement for enabling the development environment"""
    DEBUG = True
    BOL_CLIENT_ID = env.get("BOL_CLIENT_ID", "da09e4c0-0d54-450a-a1c1-90861de47ff4")
    BOL_CLIENT_SECRET = env.get("BOL_CLIENT_SECRET",
                                "ZTNTV71hxT-M3cTDVKJkFR9L5KmP11lbuWjSmARXhwkNZM-9muwvvK4rylcFxbA_wDcofobOm-8ltXLmYWSKAA")


config = {
    'development': DevelopmentConfig,
    'staging': StagingConfig,
    'prod': ProductionConfig,
}
