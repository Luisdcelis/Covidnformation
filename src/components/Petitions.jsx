import { Box, CircularProgress, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import NotifDesAnon from "./NotifDesAnon";
import NotifAnon from "./NotifAnon";

const Petitions = ({ user, cerrar }) => {
  return (
    <>
      {user === null ? (
        <CircularProgress
          style={{
            marginLeft: "43%",
            marginTop: "40px",
          }}
        />
      ) : user.petitions.length === 0 ? (
        <Box px={12} pb={20} pt={4} key={"olo"}>
          <Typography>No tiene ninguna petición de identidad</Typography>
        </Box>
      ) : user.petitions.length === 1 ? (
        <NotifDesAnon
          receiver={user}
          relation={user.petitions[0]}
          sender={user.petitions[0]}
          close={() => cerrar()}
          key={"id-notif-"}
        />
      ) : (
        user.petitions.map((i, key) => (
          <Box key={key}>
            <NotifDesAnon
              receiver={user}
              relation={i}
              sender={i}
              close={null}
              key={"id-notif-" + key}
            />
            <Divider />
          </Box>
        ))
      )}
    </>
  );
};

export default Petitions;
