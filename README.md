# Happicard

Tech Stack:
* React (Frontend)
* Django (Backend)
* SQLite (Dev DB) / Postgresql (Prod DB)
* AWS (Deployment)
* NGINX/Gunicorn (Server)

Our goal for Happicard is to integrate React.js within a Django app and consume a RESTful API with React.js

## Back-End Development Workflow
To run Django on your local computer, you will need to run the following commands to activate the local server:
```
pip install virtualenv 
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py makemigrations authentification orders payments profiles
python manage.py migrate
python manage.py runserver
```
## Front-End Development Workflow
```
npm install
```
## AWS Deployment

http://ec2-3-122-226-137.eu-central-1.compute.amazonaws.com/