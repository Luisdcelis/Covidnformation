import {
  Divider,
  IconButton,
  Typography,
  Link,
  Paper,
  Box,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import { deleteNotification, getNotifications } from "../services/neo4j_api";
import { useUser } from "../context/UserContext";

const NotifNoAnon = ({ receiver, relation, sender, close }) => {
  const { user, setUser } = useUser();

  return (
    <Box>
      <Paper style={{ maxWidth: "412px" }} square>
        <Box display="flex" flexDirection="row" p={2}>
          <Box>
            <h3 style={{ marginTop: "3px" }}>
              ¡Alerta COVID! -{" "}
              {moment(relation.date, "YYYY-MM-DD").format("DD/MM/YYYY")}
            </h3>
            <Box p={1} pr={2} pt={0}>
              <Typography style={{ fontSize: 14 }} align="justify">
                El usuario{" "}
                <Tooltip title={"Nombre: " + sender.name} arrow>
                  <b>{sender.username}</b>
                </Tooltip>{" "}
                ha dado positvo en COVID-19 y ha notificado que ha estado en
                contacto con usted. Le recomendamos que pase 5 días de
                cuarentena en casa y si aparecen los síntomas se haga la prueba
                PCR
              </Typography>
            </Box>
          </Box>
          <Box>
            <Tooltip title="Eliminar notificación" placement="top" arrow={true}>
              <IconButton
                onClick={() => {
                  //buscar relacion InContact entre emisor y receptor,
                  //la eliminamos (del content y la BD)
                  (async () => {
                    await deleteNotification({
                      receiver: receiver.username,
                      sender: sender.username,
                    });
                    const notifications = await getNotifications({
                      username: user.username,
                    });
                    const aux = { ...user, notifications };
                    setUser(aux);
                    if (close !== null) {
                      close();
                    }
                  })();
                }}
                style={{ marginTop: "10px", marginLeft: "8px" }}
              >
                <ClearIcon fontSize="large" color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default NotifNoAnon;
