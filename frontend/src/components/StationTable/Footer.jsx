import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Pagination from "./Pagination";

export default function Footer(props) {
  const { page, setPage, total } = props;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={3}
          count={total}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
          page={page}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          ActionsComponent={Pagination}
        />
      </TableRow>
    </TableFooter>
  );
}
