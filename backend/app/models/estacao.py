from config import db


class EstacaoDataBase(db.Model):
    __tablename__ = "Estacao"
    id_estacao = db.Column(db.Integer, primary_key=True)
    nome_estacao = db.Column(db.String(256), unique=True, nullable=False)
    codigo_regiao = db.Column(db.String(2), unique=True, nullable=False)
    uf = db.Column(db.String(2), nullable=False)
    codigo_wmo = db.Column(db.String(4), nullable=False)
    latitude = db.Column(db.Numeric(precision=10, scale=6), nullable=False)
    longitude = db.Column(db.Numeric(precision=10, scale=6), nullable=False)
    altitude = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    data_fundacao = db.Column(db.String(256), nullable=False)

    def __init__(self, nome_estacao, codigo_regiao, uf, codigo_wmo, latitude, longitude, altitude, data_fundacao):
        self.nome_estacao = nome_estacao
        self.codigo_regiao = codigo_regiao
        self.uf = uf
        self.codigo_wmo = codigo_wmo
        self.latitude = latitude
        self.longitude = longitude
        self.altitude = altitude
        self.data_fundacao = data_fundacao

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __repr__(self):
        return f"{self.id_estacao, self.nome_estacao, self.codigo_regiao, self.uf, self.codigo_wmo, self.latitude, self.longitude, self.altitude, self.data_fundacao}"
