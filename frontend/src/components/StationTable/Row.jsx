import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import StationDetails from "../StationDetails";
import StationModal from "../StationModal";

export default function Row(props) {
  const [openDetails, setOpenDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { station, deleteStationByCode, editStation } = props;

  function handleDelete() {
    deleteStationByCode(station.codigo_wmo);
  }

  return (
    <>
      <StationModal
        title="Editar estação"
        station={station}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        submit={editStation}
      />
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenDetails(!openDetails)}
          >
            {openDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {station.nome_estacao}
        </TableCell>
        <TableCell align="right">{station.codigo_regiao}</TableCell>
        <TableCell align="right">{station.uf}</TableCell>
        <TableCell align="right">{station.codigo_wmo}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => setOpenModal(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openDetails} timeout="auto" unmountOnExit>
            <StationDetails station={station} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
