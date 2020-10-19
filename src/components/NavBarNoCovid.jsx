import {
  AppBar,
  Box,
  Button,
  Link,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Admin from "../assets/admin.png";
import Logo1 from "../assets/Logo1.png";
import { useUser } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  badge: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "0pt 5pt",
  },
  toolbarTitle: {
    flex: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  popoverTypo: {
    margin: theme.spacing(1.5, 2),
  },
  appBar: {
    elevation: "10px",
  },
}));

function NavBarNoCovid() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPop, SetOpenPop] = useState(false);
  const { user, removeUser, setUser } = useUser();
  const history = useHistory();

  const handleClick = (event) => {
    SetOpenPop(false);
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={5}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Box>
            <Link
              component="button"
              onClick={() => {
                history.push("/home");
              }}
            >
              <img src={Logo1} alt="logo" width="250px" />
            </Link>
          </Box>
          <Link component="button" onClick={handleClick}>
            <Box m="7px">
              <img src={Admin} alt="admin" width="34px" />
            </Box>
          </Link>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-around"
              flexDirection="column"
              m="20px"
            >
              <Typography className={classes.popoverTypo}>
                ¿Desea salir?
              </Typography>
              <Box m={1} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  removeUser();
                  // history.push("/");
                  history.go(0);
                }}
              >
                Salir
              </Button>
            </Box>
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBarNoCovid;
