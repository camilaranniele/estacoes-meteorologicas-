from flask_restful import Api

from config import app, db
from app.controllers.estacao_controller import Estacao, ListaEstacao


api = Api(app)

api.add_resource(ListaEstacao, '/estacao')
api.add_resource(Estacao, '/estacao/<codigo_wmo>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
