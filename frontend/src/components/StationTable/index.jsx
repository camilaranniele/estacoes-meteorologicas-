import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Footer from "./Footer";
import Row from "./Row";

export default function StationTable(props) {
  const [page, setPage] = useState(0);
  const { stations, deleteStationByCode, editStation } = props;

  return (
    <TableContainer component={Paper} className="table" elevation={5}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="table-head">
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell align="right">Codigo Regiao</TableCell>
            <TableCell align="right">UF</TableCell>
            <TableCell align="right">Codigo WMO</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.slice(page * 10, page * 10 + 10).map((station) => (
            <Row
              key={station.id_estacao}
              station={station}
              editStation={editStation}
              deleteStationByCode={deleteStationByCode}
            />
          ))}
        </TableBody>
        <Footer page={page} setPage={setPage} total={stations.length} />
      </Table>
    </TableContainer>
  );
}
