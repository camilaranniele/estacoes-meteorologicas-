import "./App.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Table from "./StationTable";
import Loading from "./Loading";
import StationModal from "./StationModal";
import useStations from "../hooks/useStations";
import { useState } from "react";

function App() {
  const { 
    stations,
    codigosWMO,
    loading,
    createStation,
    editStation,
    getStationByCode,
    listStations,
    deleteStationByCode
  } = useStations();
  const [selectedCode, setSelectedCode] = useState("")
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => setOpen(true);

  function handleFilter() {
    if (selectedCode) {
        getStationByCode(selectedCode);
      return;
    }
    listStations();
  }

  function handleSelectedIATA(event, value) {
    setSelectedCode(value);
  }

  return (
    <Container maxWidth="lg">
      <Loading open={loading} />
      <StationModal
        title="Criar Estação"
        open={open}
        handleClose={() => setOpen(false)}
        submit={createStation}
      />
      <header>
        <h1>Estações</h1>
      </header>
      <main>
      <div className="station-filter">
          <Autocomplete
            id="select-station"
            options={codigosWMO}
            onChange={handleSelectedIATA}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Estações" />
            )}
          />
          <Button variant="contained" onClick={handleFilter}>
            Filtrar
          </Button>
        </div>
        <div className="add-station">
          <Button variant="contained" onClick={handleModalOpen}>
            Adicionar nova estação
          </Button>
        </div>
        <div>
          <Table
            stations={stations}
            editStation={editStation}
            deleteStationByCode={deleteStationByCode}
          />
        </div>
      </main>
    </Container>
  );
}

export default App;
