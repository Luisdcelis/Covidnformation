import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@material-ui/core";
import React, { useState } from "react";
import FilaTabla from "../components/FilaTabla";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

const Lista = ({ usernames, setUsernames }) => {
  const [open, setOpen] = useState(false);
  const [fila, setFila] = useState(null);

  return (
    <>
      <Divider style={{ margin: "20px 0px" }} />
      {usernames.map((i, idk) => {
        return (
          <>
            <Box
              display="flex"
              flexDirection="row"
              margin={"0px 20px"}
              key={idk}
            >
              <Box mt={1}>
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setFila(idk);
                  }}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <FilaTabla
                  username={i}
                  setUsername={(value) => {
                    usernames[idk] = value;
                    setUsernames([...usernames]);
                  }}
                />
              </Box>
            </Box>
            <Divider style={{ margin: 20 }} />
          </>
        );
      })}

      <Box ml={2.5}>
        <IconButton onClick={() => setUsernames([...usernames, null])}>
          <AddCircleIcon fontSize="large" />
        </IconButton>
      </Box>

      <Divider style={{ margin: "20px 0px" }} />

      <Dialog
        open={open}
        onClose={() => {
          setFila(null);
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Eliminar fila</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de que desea eliminar esta fila?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFila(null);
              setOpen(false);
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const aux = usernames.filter((item) => item !== usernames[fila]);
              setUsernames([...aux]);
              setFila(null);
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Lista;
