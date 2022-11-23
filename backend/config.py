from flask import Flask
from flask_cors import CORS

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://empresa_user:123456' \
                                        '@localhost/metereologia'

db = SQLAlchemy(app)
marshmallow = Marshmallow(app)