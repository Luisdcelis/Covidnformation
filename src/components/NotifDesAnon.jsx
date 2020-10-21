import { IconButton, Typography, Paper, Box, Tooltip } from "@material-ui/core";
import React from "react";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import {
  getPetitions,
  deletePetition,
  createInContact,
} from "../services/neo4j_api";
import { useUser } from "../context/UserContext";

const NotifDesAnon = ({ receiver, relation, sender, close }) => {
  const { user, setUser } = useUser();
  let today = moment().format("YYYY-MM-DD");

  return (
    <Box>
      <Paper style={{ maxWidth: "412px" }} square>
        <Box
          display="flex"
          flexDirection="row"
          p={2}
          justifyContent="space-around"
        >
          <Box>
            <h3 style={{ marginTop: "3px" }}>Petición de identidad</h3>
            <Box p={1} pr={2} pt={0}>
              <Typography style={{ fontSize: 14 }} align="justify">
                El usuario{" "}
                <Tooltip title={"Nombre: " + sender.name} arrow>
                  <b>{sender.username}</b>
                </Tooltip>{" "}
                solicita una petición de identidad
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" flexDirection="column">
            <Tooltip title="Rechazar" placement="top" arrow={true}>
              <IconButton
                onClick={() => {
                  //Borrar la relacion Petition de la BD y actualizar el content
                  (async () => {
                    await deletePetition({
                      from: sender.username,
                      to: receiver.username,
                    });
                    const petitions = await getPetitions({
                      username: user.username,
                    });
                    const aux = { ...user, petitions };
                    setUser(aux);
                    if (close !== null) {
                      close();
                    }
                  })();
                }}
                style={{ marginTop: "10px" }}
              >
                <ClearIcon fontSize="large" color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Aceptar" arrow={true}>
              <IconButton
                onClick={() => {
                  //Borrar la relacion Petition de la BD, actualizar el content
                  //Crer una relacion InContact desde el receptor al emisor
                  //Con anon=false
                  (async () => {
                    await deletePetition({
                      from: sender.username,
                      to: receiver.username,
                    });
                    const petitions = await getPetitions({
                      username: user.username,
                    });
                    const aux = { ...user, petitions };
                    setUser(aux);
                    if (close !== null) {
                      close();
                    }
                    await createInContact({
                      from: receiver.username,
                      to: sender.username,
                      date: today,
                    });
                  })();
                }}
                style={{}}
              >
                <CheckIcon fontSize="large" style={{ color: "#50C763" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotifDesAnon;
