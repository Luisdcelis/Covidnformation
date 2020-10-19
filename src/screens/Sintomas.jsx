import { Box, Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import NavBarCovid from "../components/NavBarCovid";
import InfoIcon from "@material-ui/icons/Info";
import Mapa from "../components/Mapa";
import CentrosSalud from "../components/CentrosSalud";

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

const Sintomas = () => {
  const classes = useStyles();

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
            <Typography variant="h5">La PCR</Typography>
          </Paper>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <Box style={{ margin: "0px 19%" }}>
          <Typography align="center" className={classes.root}>
            Las <b>PCR</b> (siglas en inglés de “Reacción en Cadena de la
            Polimersa”), son un tipo de pruebas de diagnóstico que se llevan
            utilizando durante años en diferentes crisis de salud pública
            relacionadas con enfermedades infecciosas. Estas pruebas se están
            usando desde los primeros días del estallido de la pandemia de
            coronavirus en España. Sin embargo, los test rápidos se han
            incorporado recientemente y, como su nombre indica, son más rápidos
            y sencillos. Ambos sirven para comprobar si una persona está
            infectada o no por el Covid-19. <br /> <br />
            Esta prueba se esta llevando a cabo en los centros de salud de la
            mayoría de las ciudades españolas (y del resto del mundo),
            <b> Si usted presenta los sintomas explicados anteriormente </b>
            debería ponerse en contacto con su centro de salud o su médico (pero
            sin ir directamenta al centro) y pedir una cita para llevar a cabo
            esta prueba.
          </Typography>
        </Box>
        <br />
        <br />
        <br />
        <Box display="flex" justifyContent="center" flexDirection="row">
          <InfoIcon
            color="primary"
            style={{ marginTop: "10px", marginRight: "5px" }}
          ></InfoIcon>
          <Paper elevation={3} style={{ padding: "5px 10px" }}>
            <Typography variant="h5">Buscador de centros de salud</Typography>
          </Paper>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <br />
        <Paper elevation={3} style={{ padding: "30px", margin: "0px 19%" }}>
          <Box style={{ overflowY: "scroll" }} maxHeight={420}>
            <br />
            <CentrosSalud />
            <br />
          </Box>
        </Paper>
        <br />
        <br />
        <br />
        <Box display="flex" justifyContent="center" flexDirection="row">
          <InfoIcon
            color="primary"
            style={{ marginTop: "10px", marginRight: "5px" }}
          ></InfoIcon>
          <Paper elevation={3} style={{ padding: "5px 10px" }}>
            <Typography variant="h5">Por último</Typography>
          </Paper>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <Box style={{ margin: "0px 19%" }}>
          <Typography align="center" className={classes.root}>
            En caso de <b> dar positivo </b> en la prueba PCR se le recomienda
            informar de ello en esta página para el correcto funcionamiento del{" "}
            <i>tracking</i> y poder avisar a las personas con las que has
            mantenido contacto en los últimos días. <br /> <br /> Para ello
            presione el botón "COVID" (encontrado en parte superior derecha de
            la pantalla) y luego el botón "he dado positivo" localizado en la
            parte inferior derecha de la pantalla.
          </Typography>
        </Box>
      </Box>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Sintomas;
