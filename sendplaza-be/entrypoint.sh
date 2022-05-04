#!/bin/bash
python manage.py db upgrade
exec gunicorn --config gunicorn_config.py manage:app
