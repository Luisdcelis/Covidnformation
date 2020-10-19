import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import NavBarCovid from "../components/NavBarCovid";
import InfoIcon from "@material-ui/icons/Info";
import MaterialTabla from "../components/MaterialTabla";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.overline,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },

  tab: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const Positivo = () => {
  const classes = useStyles();
  const [confirmar, setConfirmar] = useState(false);
  const [data, setData] = useState([
    { username: "luisdcelis", name: "Luis de Celis", city: "San Fernando" },
  ]);
  return (
    <>
      <NavBarCovid />
      <br />
      <br />
      <Box display="flex" justifyContent="center" flexDirection="column">
        <Box display="flex" justifyContent="center" flexDirection="row">
          <InfoIcon
            color="primary"
            style={{ marginTop: "10px", marginRight: "5px" }}
          ></InfoIcon>
          <Paper elevation={3} style={{ padding: "5px 10px" }}>
            <Typography variant="h5">Instrucciones</Typography>
          </Paper>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <Box style={{ margin: "0px 19%" }}>
          <Typography align="center" className={classes.root}>
            La <b> COVID-19 </b> es una enfermedad infecciosa que tiene una
            propagación de persona-persona. Por lo tanto si has dado positivo en
            COVID es por que has estado en contacto con una persona que lo ha
            tendido. <br /> <br /> Ahora lo que tiene que hacer es seguir las
            instrucciones de su doctor y rellenar la tabla que encontrarás a
            continuación. Esta tabla debe rellenarla con los datos de las
            personas que ha mantenido contacto personal en los
            <b> últimos 14 días </b> buscando por su nombre de usuario de la
            página. Con esta información lo que haremos es notificar a estos
            usuarios de que han estado en contacto con una persona con COVID y
            les daremos una serie de recomendaciones para evitar la continua
            propagación. <br /> <br />{" "}
            <b>Gracias por su ayuda y mejórese pronto</b>
          </Typography>
        </Box>
        <Divider style={{ margin: "0px 30%", backgroundColor: "lightgrey" }} />

        <br />
        <br />
        <br />
        <Box
          display="flex"
          justifyContent="center"
          style={{ margin: "0px 10%" }}
        >
          <MaterialTabla />
        </Box>

        <br />
        <br />
        <br />
        <Box
          display="flex"
          justifyContent="center"
          style={{ margin: "0px 19%" }}
          flexDirection="row"
        >
          <Box display="flex" justifyContent="center">
            <FormControlLabel
              value="bot"
              control={
                <Checkbox
                  color="primary"
                  checked={confirmar}
                  onChange={() => setConfirmar(!confirmar)}
                />
              }
              label="Confirmar"
              labelPlacement="end"
            />
          </Box>
          <Box marginLeft={4} />
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              disabled={!confirmar}
              href="/home"
            >
              notificar
            </Button>
          </Box>
        </Box>

        <br />
        <br />
        <br />
      </Box>
    </>
  );
};

export default Positivo;
