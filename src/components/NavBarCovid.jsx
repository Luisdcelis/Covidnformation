import {
  AppBar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Link,
  Paper,
  Popover,
  Snackbar,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HelpIcon from "@material-ui/icons/Help";
import MuiAlert from "@material-ui/lab/Alert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "fontsource-roboto";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Logo1 from "../assets/Logo1.png";
import { useUser } from "../context/UserContext";
import { updateCloseCircle, updateLocationUser } from "../services/neo4j_api";
import MaterialTabla from "./MaterialTabla";
import Lista from "./Lista";
import Notifications from "./Notifications";
import EmailIcon from "@material-ui/icons/Email";
import Petitions from "./Petitions";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NavBarCovid() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user, removeUser, setUser } = useUser();

  const [city, setCity] = useState(user.city);
  const [prov, setProv] = useState(user.prov);
  const [cityError, setCityError] = useState("");
  const [provError, setProvError] = useState("");
  const [openSB, setOpenSB] = useState(false);
  const [openSBMalo, setOpenSBMalo] = useState(false);
  const [msgSB, setMsgSB] = useState("");
  const [msgSBMalo, setMsgSBMalo] = useState("");
  const [usernames, setUsernames] = useState(user.closeCircle);

  const alphabetic = /^([^0-9]*)$/;

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const acceptChanges = () => {
    if (!alphabetic.test(prov)) {
      setProvError("Debe contener solo caracteres alfabéticos");
    } else {
      setProvError("");
    }
    if (!alphabetic.test(city)) {
      setCityError("Debe contener solo caracteres alfabéticos");
    } else {
      setCityError("");
    }
    if (alphabetic.test(prov) && alphabetic.test(city)) {
      user.city = city;
      user.prov = prov;
      setUser(user);
      updateLocationUser(user);
      setOpenSB(true);
      setMsgSB("Cambios realizados correctamente");
      setTimeout(() => {
        setOpenDialog(false);
      }, 1000);
    }
    setUsernames([...new Set(usernames)]);
    if (usernames.includes(user.username)) {
      setOpenSB(false);
      setMsgSBMalo("No te puedes incluir a ti mismo en tu circulo cercano");
      setOpenSBMalo(true);
    } else {
      if (usernames !== user.closeCircle) {
        user.closeCircle = usernames;
        setUser(user);
        updateCloseCircle(user);
      }
    }
  };

  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;
  const id2 = open2 ? "simple-popover" : undefined;

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
          <Box>
            <Tooltip title="Solicitudes de identidad" arrow>
              <IconButton onClick={handleClick2}>
                <div className={classes.badge}>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={user.petitions.length === 0}
                  >
                    <EmailIcon />
                  </Badge>
                </div>
              </IconButton>
            </Tooltip>
            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorEl2}
              onClose={() => setAnchorEl2(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Petitions user={user} cerrar={() => setAnchorEl(null)} />
            </Popover>
            <Tooltip title="Notificaciones" arrow>
              <IconButton onClick={handleClick} className={classes.link}>
                <div className={classes.badge}>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={user.notifications.length === 0}
                  >
                    <NotificationsIcon />
                  </Badge>
                </div>
              </IconButton>
            </Tooltip>
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
              <Notifications user={user} cerrar={() => setAnchorEl(null)} />
            </Popover>

            <Button
              color="secondary"
              variant="contained"
              className={classes.link}
              href="/covid"
            >
              COVID
            </Button>
            <Tooltip title="Mi perfil" arrow>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={openDialog}
        scroll={"paper"}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          Perfil de <b>{user && user.username}</b>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText style={{ marginBottom: "0px" }}>
            Datos de usuario
          </DialogContentText>
          <Divider />
          <TextField
            variant="outlined"
            label="Nombre completo"
            defaultValue={user.name}
            fullWidth
            disabled
            style={{ marginBottom: "30px", marginTop: "24px" }}
          />
          <TextField
            variant="outlined"
            label="Correo electrónico"
            defaultValue={user.email}
            fullWidth
            disabled
            style={{ marginBottom: "30px" }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            style={{ marginBottom: "30px" }}
          >
            <TextField
              variant="outlined"
              name="prov"
              label="Provincia"
              fullWidth
              value={prov}
              onChange={(event) => setProv(event.target.value)}
              error={provError !== ""}
              helperText={provError}
            />
            <Box m={2} />
            <TextField
              variant="outlined"
              name="city"
              label="Ciudad"
              fullWidth
              value={city}
              onChange={(event) => setCity(event.target.value)}
              error={cityError !== ""}
              helperText={cityError}
            />
          </Box>

          <DialogContentText style={{ marginBottom: "0px" }}>
            <Box display="flex" flexDirection="row" marginBottom={0.5}>
              <Box display="flex">
                <Typography>Círculo cercano</Typography>
              </Box>
              <Box marginLeft={1} />
              <Box display="flex">
                <Tooltip
                  title="Las personas con las que convives o ves asiduamente "
                  placement="top-start"
                  arrow
                >
                  <HelpIcon />
                </Tooltip>
              </Box>
            </Box>
          </DialogContentText>
          <Divider />
          <br />
          <Paper elevation={5}>
            <Lista
              usernames={usernames}
              setUsernames={(value) => setUsernames(value)}
            />
          </Paper>
        </DialogContent>
        <Box className={classes.toolbar}>
          <DialogActions>
            <Box display="flex">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  removeUser();
                  // history.push("/");
                  history.go(0);
                }}
              >
                Cerrar sesión
              </Button>
            </Box>
          </DialogActions>
          <Box display="flex">
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={() => acceptChanges()} color="primary">
              Aceptar cambios
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Snackbar
        open={openSB}
        autoHideDuration={4000}
        onClose={() => {
          setOpenSB(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSB(false);
          }}
          severity="success"
        >
          {msgSB}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSBMalo}
        autoHideDuration={4000}
        onClose={() => {
          setOpenSBMalo(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSBMalo(false);
          }}
          severity="error"
        >
          {msgSBMalo}
        </Alert>
      </Snackbar>
    </>
  );
}

export default NavBarCovid;
