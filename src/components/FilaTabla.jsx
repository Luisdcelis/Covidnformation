import { Box, InputLabel, TextField } from "@material-ui/core";
import React, { useState } from "react";
import UserAutocomplete from "../components/UserAutocomplete";

const FilaTabla = ({ username, setUsername }) => {
  const [dataUser, setDataUser] = useState([]);

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box flexGrow={0.7} minWidth={200}>
          <InputLabel>Username</InputLabel>
          <UserAutocomplete
            selected={username}
            setSelected={(data) => {
              setUsername(data);
            }}
            setDataUser={(data) => {
              setDataUser(data.result);
            }}
          />
        </Box>
        <Box ml={2}>
          <InputLabel>Nombre</InputLabel>
          <TextField
            disabled
            variant="outlined"
            value={dataUser ? dataUser.name : ""}
          />
        </Box>
        <Box ml={2}>
          <InputLabel>Provincia</InputLabel>
          <TextField
            disabled
            variant="outlined"
            value={dataUser ? dataUser.prov : ""}
          />
        </Box>

        <Box ml={2}>
          <InputLabel>Ciudad</InputLabel>
          <TextField
            disabled
            variant="outlined"
            value={dataUser ? dataUser.city : ""}
          />
        </Box>
      </Box>
    </>
  );
};

export default FilaTabla;
