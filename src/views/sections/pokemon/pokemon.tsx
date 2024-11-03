"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "@/models/reducers/pokemon/action";
import { RootState, AppDispatch } from "@/models/store";
import { useRouter } from "next/navigation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, CircularProgress, Typography } from "@mui/material";

interface Column {
  id: "name" | "image" | "types" | "action";
  label: string;
  minWidth?: number;
  align?: "center";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "image", label: "Image", minWidth: 100, align: "center" },
  { id: "types", label: "Types", minWidth: 100, align: "center" },
  { id: "action", label: "Action", minWidth: 100, align: "center" },
];

export default function Pokemon() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isClient, setIsClient] = React.useState(false); // Track client-side rendering

  React.useEffect(() => {
    setIsClient(true); // Set to true after component mounts on client
    dispatch(fetchPokemon());
  }, [dispatch]);

  const handleViewDetails = (pokemonName: string) => {
    router.push(`/pokemon/${pokemonName}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(newPage, event);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!isClient) return null; // Avoid rendering until on the client
  // Menangani loading dan error
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pokemon, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = pokemon[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "image" ? (
                          <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            width={50}
                            height={50}
                          />
                        ) : column.id === "action" ? (
                          <Button onClick={() => handleViewDetails(pokemon.name)}>
                            <VisibilityIcon />
                          </Button>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
