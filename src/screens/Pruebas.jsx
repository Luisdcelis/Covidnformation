import { Box, Divider } from "@material-ui/core";
import React from "react";
import NotifAnon from "../components/NotifAnon";
import NotifDesAnon from "../components/NotifDesAnon";
import NotifNoAnon from "../components/NotifNoAnon";

const Pruebas = () => {
  const relation = { date: "2020-10-20" };
  const sender = { username: "ertio", name: "nosekien" };
  const receiver = { username: "lolz", name: "nose" };

  const lol = [
    { un: "lol", anon: true },
    { un: "ercojne", anon: false },
    { un: "lol", anon: false },
  ];
  const lol2 = [
    { un: "lol", anon: true },
    { un: "ercojne", anon: false },
    { un: "lol2", anon: false },
  ];

  const contEqUn = (v, un) => {
    let cont = 0;
    v.map((i, idx) => {
      if (i.un === un) {
        cont = cont + 1;
      }
    });
    return cont;
  };

  const hayUnRepetidos = (v) => {
    let tamoBn = true;
    v.map((i, idx) => {
      if (contEqUn(v, i.un) > 1) {
        tamoBn = false;
      }
    });
    return !tamoBn;
  };
  console.log(hayUnRepetidos(lol2));

  return (
    <>
      <h1>Pruebas</h1>
      <Box>
        <NotifAnon relation={relation} sender={sender} receiver={receiver} />
        <Divider />
        <NotifNoAnon relation={relation} sender={sender} receiver={receiver} />
        <Divider />
        <NotifDesAnon relation={relation} sender={sender} receiver={receiver} />
      </Box>
    </>
  );
};

export default Pruebas;
