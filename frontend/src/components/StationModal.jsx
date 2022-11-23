import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

export default function StationModal(props) {
  const { open, handleClose, title, submit, station } = props;
  const [newStation, setNewStation] = useState({ id_estacao: -1 });

  useEffect(() => {
    if (station) {
        setNewStation(station);
    }
  }, [station]);

  function handleInputChange(inputType) {
    return function (event) {
        setNewStation({ ...newStation, [inputType]: event.target.value });
    };
  }

  function handleSubmit(station) {
    submit(station);
    setNewStation({ id_estacao: -1 });
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-content">
        <Typography className="modal-title" variant="h5" component="h2">
          {title}
        </Typography>
        <div className="modal-inputs">
          <TextField
            className="nome"
            id="outlined-basic"
            label="Nome da estação"
            variant="outlined"
            value={newStation.nome_estacao}
            onChange={handleInputChange("nome_estacao")}
          />
          <TextField
            className="codigo-regiao"
            id="outlined-basic"
            label="Código Região"
            variant="outlined"
            value={newStation.codigo_regiao}
            onChange={handleInputChange("codigo_regiao")}
            inputProps={{ style: { textTransform: "uppercase" }, maxLength: 2 }}
          />
          <TextField
            className="uf"
            id="outlined-basic"
            label="UF"
            variant="outlined"
            value={newStation.uf}
            onChange={handleInputChange("uf")}
            inputProps={{ style: { textTransform: "uppercase" }, maxLength: 2 }}
          />
          <TextField
            className="codigo_wmo"
            id="outlined-basic"
            label="Código WMO"
            disabled={!!station}
            variant="outlined"
            value={newStation.codigo_wmo}
            onChange={handleInputChange("codigo_wmo")}
            inputProps={{ style: { textTransform: "uppercase" }, maxLength: 4}}
          />
          <TextField
            className="latitude"
            id="outlined-basic"
            label="Latitude"
            variant="outlined"
            type="number"
            value={newStation.latitude}
            onChange={handleInputChange("latitude")}
          />
          <TextField
            className="longitude"
            id="outlined-basic"
            label="Longitude"
            variant="outlined"
            type="number"
            value={newStation.longitude}
            onChange={handleInputChange("longitude")}
          />
          <TextField
            className="altitude"
            id="outlined-basic"
            label="Altitude"
            variant="outlined"
            type="number"
            value={newStation.altitude}
            onChange={handleInputChange("altitude")}
          />
          <TextField
            className="data_fundacao"
            id="outlined-basic"
            label="Data Fundação"
            variant="outlined"
            value={newStation.data_fundacao}
            onChange={handleInputChange("data_fundacao")}
          />
        </div>
        <div className="modal-buttons">
          <Button variant="outlined" onClick={handleClose}>
            CANCELAR
          </Button>
          <Button variant="contained" onClick={() => handleSubmit(newStation)}>
            SALVAR
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
