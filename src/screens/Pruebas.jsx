import { Box, Divider } from "@material-ui/core";
import React from "react";
import NotifAnon from "../components/NotifAnon";
import NotifDesAnon from "../components/NotifDesAnon";
import NotifNoAnon from "../components/NotifNoAnon";

const Pruebas = () => {
  const relation = { date: "2020-10-20" };
  const sender = { username: "ertio", name: "nosekien" };
  const receiver = { username: "lolz", name: "nose" };

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
