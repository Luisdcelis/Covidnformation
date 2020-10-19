import {
  Box,
  Button,
  Divider,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React, { useState } from "react";
import NavBarCovid from "../components/NavBarCovid";
import SwipeableViews from "react-swipeable-views";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Covid = () => {
  const classes = useStyles();
  const [pestana, setPestana] = useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setPestana(newValue);
  };

  const handleChangeIndex = (index) => {
    setPestana(index);
  };

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
            <Typography variant="h5">Información</Typography>
          </Paper>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <Box style={{ margin: "0px 19%" }}>
          <Typography align="center" className={classes.root}>
            La COVID-19 (acrónimo del inglés coronavirus disease 2019), también
            conocida como enfermedad por coronavirus e incorrectamente como
            neumonía por coronavirus, es una enfermedad infecciosa causada por
            el virus SARS-CoV-2. Produce síntomas similares a los de la gripe o
            catarro, entre los que se incluyen fiebre, tos,​ disnea, mialgia y
            fatiga.​ En casos graves se caracteriza por producir neumonía,
            síndrome de dificultad respiratoria aguda, sepsis y choque séptico
            que conduce a cerca de 3,75 % de los infectados a la muerte según la
            OMS. No existe tratamiento específico; las medidas terapéuticas
            principales consisten en aliviar los síntomas y mantener las
            funciones vitales.
          </Typography>
        </Box>
        <Divider style={{ margin: "15px 30%", backgroundColor: "lightgrey" }} />
        <Box>
          <Paper style={{ margin: "20px 20%" }} elevation={3}>
            <Tabs
              value={pestana}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              variant="fullWidth"
            >
              <Tab label="Síntomas" {...a11yProps(0)} />
              <Tab label="Prevención" {...a11yProps(1)} />
              <Tab label="Tratamientos" {...a11yProps(2)} />
            </Tabs>
            <Divider />
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={pestana}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={pestana} index={0} dir={theme.direction}>
                <Typography>
                  La COVID-19 afecta de distintas maneras en función de cada
                  persona. La mayoría de las personas que se contagian presentan
                  síntomas de intensidad leve o moderada, y se recuperan sin
                  necesidad de hospitalización.
                </Typography>
                <Divider style={{ margin: "15px 15px" }} />
                <>
                  Los síntomas más habituales son los siguientes: <br />
                  <ul>
                    <li>Fiebre</li>
                    <li>Tos seca</li>
                    <li>Cansancio</li>
                  </ul>
                  Otros síntomas menos comunes son los siguientes:
                  <ul>
                    <li>Molestias y dolores </li>
                    <li>Dolor de garganta </li>
                    <li>Diarrea </li>
                    <li>Conjuntivitis </li>
                    <li>Dolor de cabeza </li>
                    <li>Pérdida del sentido del olfato o del gusto </li>
                    <li>
                      Erupciones cutáneas o pérdida del color en los dedos de
                      las manos o de los pies
                    </li>
                  </ul>
                  Los síntomas graves son los siguientes:
                  <ul>
                    <li>
                      Dificultad para respirar o sensación de falta de aire
                    </li>
                    <li>Dolor o presión en el pecho </li>
                    <li>Incapacidad para hablar o moverse </li>
                  </ul>
                  Si presentas síntomas graves, busca atención médica inmediata.
                  Sin embargo, siempre debes llamar a tu doctor o centro de
                  atención sanitaria antes de presentarte en el lugar en
                  cuestión. Lo recomendable es que las personas que sufran
                  síntomas leves y tengan un buen estado de salud general se
                  confinen en casa. De media, las personas que se contagian
                  empiezan a presentar síntomas en un plazo de 5 a 6 días desde
                  que se infectan, pero pueden tardar hasta 14.
                </>
              </TabPanel>
              <TabPanel value={pestana} index={1} dir={theme.direction}>
                <img
                  src="https://www.gstatic.com/healthricherkp/campaigns/wear-mask-save-lives/UZ9ZuX.svg"
                  style={{ margin: "0px 44%" }}
                  alt="img"
                />
                <Typography align="center" variant="h3">
                  Utiliza mascarilla
                </Typography>
                <br />
                <Typography align="center" variant="h4">
                  Lávate las manos
                </Typography>
                <br />
                <Typography align="center" variant="h4">
                  Mantén una distancia segura
                </Typography>
                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: " 40%" }}
                  href="https://www.who.int/es/emergencies/diseases/novel-coronavirus-2019/advice-for-public/when-and-how-to-use-masks"
                >
                  Más información
                </Button>
              </TabPanel>
              <TabPanel value={pestana} index={2} dir={theme.direction}>
                <Typography>
                  Cuidados personales: <br />
                  <br />
                  Si se siente enfermo debe descansar, beber mucho líquido y
                  comer alimentos nutritivos. Permanezca en una habitación
                  separada de los demás miembros de la familia y utilice un baño
                  exclusivamente para usted si es posible. Limpie y desinfecte
                  frecuentemente las superficies que toque.
                  <br /> <br /> Todas las personas deben mantener un estilo de
                  vida saludable en casa. Lleve una dieta saludable, duerma,
                  manténgase activo y establezca contacto social con los seres
                  queridos a través del teléfono o internet. Los niños necesitan
                  dosis adicionales de cariño y atención de los adultos durante
                  los momentos difíciles. Mantenga rutinas y horarios regulares
                  en la medida de lo posible. <br /> <br />
                  Es normal sentirse triste, estresado o confundido durante una
                  crisis. Hablar con personas en las que confíe, como amigos y
                  familiares, le puede ayudar. Si se siente abrumado, hable con
                  un trabajador de la salud o un consejero.
                </Typography>
                <Divider style={{ margin: "20px 15px" }} />
                <Typography>
                  Tratamientos médicos: <br /> <br /> Si tiene síntomas leves y,
                  por lo demás, está sano, aíslese y póngase en contacto con su
                  proveedor de atención médica o con una línea de información
                  sobre la COVID‑19 para recibir asesoramiento.
                  <br /> <br /> Solicite atención médica si tiene fiebre, tos y
                  dificultad para respirar. Llame con antelación.
                </Typography>
              </TabPanel>
            </SwipeableViews>
          </Paper>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          style={{ marginTop: "30px", marginBottom: "50px" }}
        >
          <Button color="primary" variant="contained" href="/sintomas">
            Tengo los síntomas
          </Button>
          <Box marginLeft={10} marginRight={10} />
          <Button color="primary" variant="contained" href="/positivo">
            He dado positivo
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Covid;
