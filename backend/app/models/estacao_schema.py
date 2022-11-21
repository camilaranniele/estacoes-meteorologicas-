from marshmallow import fields

from app.models.estacao import EstacaoDataBase
from config import marshmallow, db


class EstacaoDataBaseSchema(marshmallow.SQLAlchemyAutoSchema):
    class Meta:
        model = EstacaoDataBase
        sqla_session = db.session

    id_estacao = fields.Number()  # dump_only=True)
    nome_estacao = fields.String(required=True)
    codigo_regiao = fields.String(required=True)
    uf = fields.String(required=True)
    codigo_wmo = fields.String(required=True)
    latitude = fields.Float(required=True)
    longitude = fields.Float(required=True)
    altitude = fields.Float(required=True)
    data_fundacao = fields.String(required=True)
