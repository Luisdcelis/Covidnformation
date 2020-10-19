import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import provEsp from "../assets/provEsp.json";
import csalud from "../assets/csalud.json";

const Pruebas = () => {
  let aux = [];
  provEsp.forEach((element) => {
    aux = [...aux, element.CCAA];
  });
  let uniq = [...new Set(aux)];
  const [CCAAs, setCCAAs] = useState(uniq);

  const [selectedCA, setSelectedCA] = useState("");

  const [provs, setProvs] = useState(provEsp);

  const [cSalud, setCSalud] = useState();

  useEffect(() => {
    setSelectedProv(null);
    let aux1 = provEsp.filter((element) => element.CCAA === selectedCA);
    setProvs(aux1);
  }, [selectedCA]);

  const [selectedProv, setSelectedProv] = useState(null);

  useEffect(() => {
    if (selectedProv !== null) {
      let aux = csalud.filter(
        (element) => element.Provincia === selectedProv.Provincia.toUpperCase()
      );
      const sitios = aux.map((element) => {
        let aux = {};
        aux["nombre"] = element.Nombre;
        aux["telefono"] = element.Telefono;
        aux["ciudad"] = element.Municipio;
        return aux;
      });
      setCSalud(sitios);
    }
  }, [selectedProv]);

  return (
    <>
      <Autocomplete
        options={CCAAs}
        autoHighlight
        renderInput={(params) => (
          <TextField
            {...params}
            label="Comunidad Autónoma"
            variant="outlined"
          />
        )}
        value={selectedCA}
        onChange={(_event, value) => setSelectedCA(value)}
      />
      {selectedCA ? (
        <Autocomplete
          options={provs}
          autoHighlight
          getOptionLabel={(option) => option.Provincia}
          renderInput={(params) => (
            <TextField {...params} label="Provincia" variant="outlined" />
          )}
          value={selectedProv}
          onChange={(_event, value) => setSelectedProv(value)}
        ></Autocomplete>
      ) : (
        <></>
      )}
      {selectedProv && selectedCA ? (
        <>
          {cSalud &&
            cSalud.map((elto, key) => {
              return (
                <Box key={key}>
                  <Typography>
                    <b>Nombre</b>: {elto.nombre} ({elto.ciudad})
                  </Typography>
                  <Typography>
                    <b>Telefono</b>: {elto.telefono}
                  </Typography>
                </Box>
              );
            })}
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default Pruebas;
