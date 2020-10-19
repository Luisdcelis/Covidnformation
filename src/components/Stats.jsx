/* eslint-disable jsx-a11y/accessible-emoji */
import {
  Box,
  CircularProgress,
  Divider,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Link,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import React, { useEffect, useState } from "react";
import {
  getDataCovidGlobal,
  getDataCovidSpain,
  getMapa,
} from "../services/api";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
  card: {},
  media: {},
  titulo: { margin: "30px 0px" },
  lol: {
    overflow: "auto",
  },
});

const Stats = () => {
  let yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
  const classes = useStyles();
  const [pais, setPais] = useState(false);
  const [dataSpa, setDataSpa] = useState(null);
  const [dataGlo, setDataGlo] = useState(null);
  const [fecha, setFecha] = useState(yesterday);
  const [ca, setCA] = useState("none");
  const [dataReg, setDataReg] = useState();

  const [dataImage, setDataImage] = useState(null);

  useEffect(() => {
    (async () => {
      setTimeout(setDataSpa(null), 4000);
      const res = await getDataCovidSpain(fecha);
      const resImg = await getMapa();
      setDataImage(resImg);
      setDataSpa(res);
    })();
  }, [fecha]);

  useEffect(() => {
    (async () => {
      setDataGlo(null);
      const res = await getDataCovidGlobal(fecha);
      const resImg = await getMapa();
      setDataGlo(res);
      setDataImage(resImg);
    })();
  }, [fecha]);

  // useEffect(() => {
  //   (async () => {
  //     const aux = moment(fecha, "YYYY-MM-DD").format("YYYY-M-D");
  //     setUrlImageCases(
  //       `https://resources.gabriele.ai/coronavirus/${aux}-18_05-COVID-only_country-spain-es_COVID_ES_country_confirmed.png`
  //     );
  //     setUrlImagesDeaths(
  //       `https://resources.gabriele.ai/coronavirus/${aux}-18_05-COVID-only_country-spain-es_COVID_ES_country_deaths.png`
  //     );
  //   })();
  // }, [fecha]);

  const findData = (id) => {
    const data = dataSpa.regions.find((region) => region.id === id);
    setDataReg(data);
  };

  return (
    <Box>
      <h2 className={classes.titulo}>Estadísticas sobre el covid</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          maxDate={yesterday}
          minDate={"2020-01-23"}
          fullWidth
          id="date-picker-dialog"
          label="Fecha"
          format="dd/MM/yyyy"
          value={fecha}
          onChange={(event) =>
            setFecha(moment.parseZone(event).format("YYYY-MM-DD"))
          }
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
      <br />
      <br />
      <InputLabel>País</InputLabel>
      <Select
        value={pais}
        onChange={(event) => setPais(event.target.value)}
        displayEmpty
        className={classes.selectEmpty}
        fullWidth
      >
        <MenuItem value={false}>🌍 Global</MenuItem>
        <MenuItem value={true}>🇪🇸 España</MenuItem>
      </Select>

      {!pais ? (
        <>
          {dataGlo ? (
            <>
              <Paper
                style={{
                  padding: "1px 20px 20px 20px",
                  marginTop: "37px",
                }}
              >
                <h3>
                  Datos sobre el covid en el mundo del día{" "}
                  {moment(dataGlo.date, "YYYY-MM-DD").format("DD/MM/YYYY")}:
                </h3>
                <Divider style={{ marginTop: "-15px", marginBottom: "15px" }} />

                <Typography>
                  <b>Casos confirmados:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_confirmed
                  )}
                </Typography>
                <Typography>
                  <b>Muertes:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_deaths
                  )}
                </Typography>
                <Typography>
                  <b>Casos recuperados:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_recovered
                  )}
                </Typography>

                <Typography>
                  <b>Nuevos casos:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_new_confirmed
                  )}
                </Typography>
                <Typography>
                  <b>Nuevas muertes:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_new_deaths
                  )}
                </Typography>
                <Typography>
                  <b>Nuevos recuperados:</b>{" "}
                  {new Intl.NumberFormat(["ban", "id"]).format(
                    dataGlo.today_new_recovered
                  )}
                </Typography>
              </Paper>
            </>
          ) : (
            <CircularProgress
              style={{
                marginLeft: "43%",
                marginTop: "40px",
              }}
            />
          )}
        </>
      ) : (
        <>
          <br />
          <br />
          <InputLabel>Comunidad Autónoma</InputLabel>
          <Select
            value={ca}
            onChange={(event) => {
              setCA(event.target.value);
              findData(event.target.value);
            }}
            displayEmpty
            className={classes.selectEmpty}
            fullWidth
          >
            <MenuItem value={"none"}>Total</MenuItem>
            <MenuItem value={"andalucia"}>Andalucia</MenuItem>
            <MenuItem value={"aragon"}>Aragón</MenuItem>
            <MenuItem value={"asturias"}>Asturias</MenuItem>
            <MenuItem value={"baleares"}>Islas Baleares</MenuItem>
            <MenuItem value={"canarias"}>Islas Canarias</MenuItem>
            <MenuItem value={"cantabria"}>Cantabria</MenuItem>
            <MenuItem value={"castilla-la_mancha"}>Castilla la Mancha</MenuItem>
            <MenuItem value={"castilla_y_leon"}>Castilla y León</MenuItem>
            <MenuItem value={"cataluna"}>Cataluña</MenuItem>
            <MenuItem value={"ceuta"}>Ceuta</MenuItem>
            <MenuItem value={"extremadura"}>Extremadura</MenuItem>
            <MenuItem value={"galicia"}>Galicia</MenuItem>
            <MenuItem value={"la_rioja"}>La Rioja</MenuItem>
            <MenuItem value={"madrid"}>Madrid</MenuItem>
            <MenuItem value={"melilla"}>Melilla</MenuItem>
            <MenuItem value={"murcia"}>Murcia</MenuItem>
            <MenuItem value={"navarra"}>Navarra</MenuItem>
            <MenuItem value={"pais_vasco"}>País Vasco</MenuItem>
            <MenuItem value={"c_valenciana"}>Valencia</MenuItem>
          </Select>
          {dataSpa ? (
            <>
              <Paper
                style={{
                  padding: "1px 20px 20px 20px",
                  marginTop: "37px",
                }}
              >
                <h3>
                  Datos sobre el covid
                  {ca === "none" ? (
                    <> en España </>
                  ) : (
                    <> en {dataReg.name} </>
                  )}{" "}
                  del día{" "}
                  {moment(dataSpa.date, "YYYY-MM-DD").format("DD/MM/YYYY")}:
                </h3>

                {ca === "none" ? (
                  <>
                    <Divider
                      style={{ marginTop: "-15px", marginBottom: "15px" }}
                    />
                    <Typography>
                      <b>Casos confirmados:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataSpa.today_confirmed
                      )}
                    </Typography>
                    <Typography>
                      <b>Muertes:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataSpa.today_deaths
                      )}
                    </Typography>
                    <Typography>
                      <b>Casos recuperados: -</b>{" "}
                      {/* {new Intl.NumberFormat(["ban", "id"]).format(
                      dataSpa.today_recovered
                    )} */}
                    </Typography>

                    <Typography>
                      <b>Nuevos casos:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataSpa.today_new_confirmed
                      )}
                    </Typography>
                    <Typography>
                      <b>Nuevas muertes:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataSpa.today_new_deaths
                      )}
                    </Typography>
                    <Typography>
                      <b>Nuevos recuperados: -</b>{" "}
                      {/* {new Intl.NumberFormat(["ban", "id"]).format(
                      dataSpa.today_new_recovered
                    )} */}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Divider
                      style={{ marginTop: "-15px", marginBottom: "15px" }}
                    />
                    <Typography>
                      <b>Casos confirmados:</b>
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataReg.today_confirmed
                      )}
                    </Typography>
                    <Typography>
                      <b>Muertes:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataReg.today_deaths
                      )}
                    </Typography>
                    <Typography>
                      <b>Casos recuperados: -</b>{" "}
                      {/* {new Intl.NumberFormat(["ban", "id"]).format(
                      dataReg.today_recovered
                    )} */}
                    </Typography>

                    <Typography>
                      <b>Nuevos casos:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataReg.today_new_confirmed
                      )}
                    </Typography>
                    <Typography>
                      <b>Nuevas muertes:</b>{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        dataReg.today_new_deaths
                      )}
                    </Typography>
                    <Typography>
                      <b>Nuevos recuperados: -</b>{" "}
                      {/* {new Intl.NumberFormat(["ban", "id"]).format(
                      dataReg.today_new_recovered
                    )} */}
                    </Typography>
                  </>
                )}

                <h2>Gráficas: </h2>
                <Divider style={{ marginTop: "-15px", marginBottom: "15px" }} />
                <Typography>
                  Para mejor resolución haga click en la imagen
                </Typography>

                <h3> Confirmados diarios en España</h3>

                <Link
                  component="button"
                  onClick={() => {
                    const win = window.open(
                      dataImage.graphs.graph_picurl_spain_confirmed,
                      "blank"
                    );
                    win.focus();
                  }}
                >
                  <img
                    src={dataImage.graphs.graph_picurl_spain_confirmed}
                    alt={"gráfica confirmados españa"}
                    width="100%"
                  />
                </Link>

                <h3> Muertes diarias en España</h3>

                <Link
                  component="button"
                  onClick={() => {
                    const win = window.open(
                      dataImage.graphs.graph_picurl_spain_deaths,
                      "blank"
                    );
                    win.focus();
                  }}
                >
                  <img
                    src={dataImage.graphs.graph_picurl_spain_deaths}
                    alt={"gráfica muertes españa"}
                    width="100%"
                  />
                </Link>
              </Paper>
            </>
          ) : (
            <CircularProgress
              style={{
                marginLeft: "43%",
                marginTop: "40px",
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Stats;
