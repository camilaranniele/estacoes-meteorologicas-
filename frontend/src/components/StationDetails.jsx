export default function AirportDetails(props) {
    const { station } = props;
  
    return (
      <div className="details">
        <p className="info">
          <b>Nome: </b>
          {station.nome_estacao}
        </p>
        <p className="info">
          <b>Código Região: </b>
          {station.codigo_regiao}
        </p>
        <p className="info">
          <b>UF: </b>
          {station.uf}
        </p>
        <p className="info">
          <b>Código WMO: </b>
          {station.codigo_wmo}
        </p>
        <p className="local">
          <b>Longitude: </b>
          {station.longitude}
        </p>
        <p className="local">
          <b>Latitude: </b>
          {station.latitude}
        </p>
        <p className="local">
          <b>Altitude: </b>
          {station.altitude}
        </p>
        <p className="local">
          <b>Data fundação: </b>
          {station.data_fundacao}
        </p>
      </div>
    );
  }
  