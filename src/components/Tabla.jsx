import {
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

function createData(username, name, city) {
  return { username, name, city };
}

const data = [
  createData("luisdcelis", "Luis de Celis", "Cádiz"),
  createData("username", "name", "city"),
  createData("username", "name", "city"),
];

const useStyles = makeStyles({
  table: {},
});

const Tabla = () => {
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper} style={{ maxHeight: 250 }}>
        <Table
          className={classes.table}
          size="small"
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Nombre&nbsp;completo</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>Editar</TableCell>
              <TableCell>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i, idk) => (
              <TableRow key={idk}>
                <TableCell>{i.username}</TableCell>
                <TableCell>{i.name}</TableCell>
                <TableCell>{i.city}</TableCell>
                <TableCell>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            <TableRow key="last">
              <TableCell>
                <IconButton size="small">
                  <AddCircleIcon fontSize="large" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tabla;
