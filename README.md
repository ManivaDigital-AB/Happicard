# Happicard

Tech Stack:
* React (Frontend)
* Django (Backend)
* SQLite (Dev DB) / Postgresql (Prod DB)
* AWS (Deployment)
* Windows (Frontend Server)
* Linux/NGINX/Gunicorn (Backend Server)
* Stripe (Payment Service)
* RabbitMQ (Message Broker)

Our goal for Happicard is to integrate React.js within a Django app and consume a RESTful API with React.js

## Back-End Development Workflow
To run Django on your local computer, you will need to run the following commands:
```
pip install virtualenv 
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py makemigrations authentification orders payments profiles
python manage.py migrate
python manage.py runserver
```
For running scheduled tasks with Celery workers:
```
celery --app backend.settings.celery worker -l INFO
```
## Front-End Development Workflow
```
npm install
```


