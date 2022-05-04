import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from config import config
from app import app
from models import *

conf = config[os.environ.get('ENVIRONMENT', 'staging')]
app.config.from_object(conf)

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
    app.run(host='0.0.0.0')
