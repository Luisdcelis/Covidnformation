import { Box, CircularProgress, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import NotifNoAnon from "./NotifNoAnon";
import NotifAnon from "./NotifAnon";

const Notifications = ({ user, cerrar }) => {
  return (
    <>
      {user === null ? (
        <CircularProgress
          style={{
            marginLeft: "43%",
            marginTop: "40px",
          }}
        />
      ) : user.notifications.length === 0 ? (
        <Box px={12} pb={20} pt={4} key={"olo"}>
          <Typography>No tiene ninguna notificación</Typography>
        </Box>
      ) : user.notifications.length === 1 ? (
        user.notifications[0].anon === false ? (
          <NotifNoAnon
            receiver={user}
            relation={user.notifications[0]}
            sender={user.notifications[0]}
            close={() => cerrar()}
            key={"id-notif-"}
          />
        ) : (
          <NotifAnon
            receiver={user}
            relation={user.notifications[0]}
            sender={user.notifications[0]}
            close={() => cerrar()}
            key={"id-notif-"}
          />
        )
      ) : (
        user.notifications.map((i, key) =>
          i.anon === false ? (
            <>
              <NotifNoAnon
                receiver={user}
                relation={i}
                sender={i}
                close={null}
                key={"id-notif-" + key}
              />
              <Divider />
            </>
          ) : (
            <>
              <NotifAnon
                receiver={user}
                relation={i}
                sender={i}
                close={null}
                key={"id-notif-" + key}
              />
              <Divider />
            </>
          )
        )
      )}
    </>
  );
};

export default Notifications;
