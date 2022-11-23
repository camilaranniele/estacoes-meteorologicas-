import argparse

from flask_restful import reqparse, Api, Resource, fields
from sqlalchemy import asc
from app.models.estacao import EstacaoDataBase
from app.models.estacao_schema import EstacaoDataBaseSchema
from config import db


parser = reqparse.RequestParser()
parser.add_argument('id_estacao', type=int,
                    help='identificador da estacao')
parser.add_argument('nome_estacao', type=str, help='nome do estacao')
parser.add_argument('codigo_regiao', type=str, help='codigo regiao')
parser.add_argument('uf', type=str, help='UF')
parser.add_argument('codigo_wmo', type=str, help='codigo WMO da estacao meteorologica - A001')
parser.add_argument('latitude', type=float, help='latitude')
parser.add_argument('longitude', type=float, help='longitude')
parser.add_argument('altitude', type=float, help='altitude')
parser.add_argument('data_fundacao', type=str, help='data')


class Estacao(Resource):
    def get(self, codigo_wmo):
        estacao = EstacaoDataBase.query.filter_by(
            codigo_wmo=codigo_wmo).first()
        estacao_schema = EstacaoDataBaseSchema()
        resp = estacao_schema.dump(estacao)
        return resp, 200

    def delete(self, codigo_wmo):
        estacao = EstacaoDataBase.query.filter_by(
            codigo_wmo=codigo_wmo).first()
        db.session.delete(estacao)
        db.session.commit()
        return 'Estação deletada', 204

    def put(self, codigo_wmo):
        estacao_json = parser.parse_args()
        estacao = EstacaoDataBase.query.filter_by(
            codigo_wmo=codigo_wmo).first()

        estacao.nome_estacao = estacao_json.nome_estacao
        estacao.codigo_regiao = estacao_json.codigo_regiao
        estacao.uf = estacao_json.uf
        estacao.codigo_wmo = estacao_json.codigo_wmo
        estacao.latitude = estacao_json.latitude
        estacao.longitude = estacao_json.longitude
        estacao.altitude = estacao_json.altitude
        estacao.data_fundacao = estacao_json.data_fundacao

        db.session.add(estacao)
        db.session.commit()

        estacao_schema = EstacaoDataBaseSchema(
            only=['nome_estacao', 'codigo_regiao', 'uf', 'codigo_wmo', 'latitude', 'longitude',
                  'altitude', 'data_fundacao'])
        resp = estacao_schema.dump(estacao)

        return resp, 200


class ListaEstacao(Resource):
    def get(self):
        estacoes = EstacaoDataBase.query.order_by(asc(EstacaoDataBase.codigo_wmo)).all()       
        estacao_schema = EstacaoDataBaseSchema(many=True)
        resp = estacao_schema.dump(estacoes)
        return resp, 200

    def post(self):
        estacao_json = parser.parse_args()
        estacao_schema = EstacaoDataBaseSchema()
        estacao = estacao_schema.load(estacao_json)
        estacaoDataBase = EstacaoDataBase(
            estacao["nome_estacao"], estacao["codigo_regiao"],
            estacao["uf"], estacao["codigo_wmo"],
            estacao["latitude"], estacao["longitude"], estacao["altitude"],
            estacao["data_fundacao"]
        )
        resp = estacao_schema.dump(estacaoDataBase.create())
        return resp, 201
