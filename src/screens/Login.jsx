import { Paper, Snackbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import Logo1 from "../assets/Logo1.png";
import { useUser } from "../context/UserContext";
import {
  getAdmin,
  getCloseCircle,
  getUser,
  getUsernames,
  getNotifications,
  getPetitions,
} from "../services/neo4j_api";

const bcrypt = require("bcryptjs");

const validationSchema = yup.object({
  username: yup.string().required("Introduzca el nombre de usuario"),
  password: yup.string().required("Por favor, introduzca la contraseña"),
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © covidnformation "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(2),
    marginTop: "1px",
    backgroundColor: theme.palette.primary.main,
  },
}));

const initialValues = { username: "", password: "" };

export default function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [openSB, setOpenSB] = useState(false);
  const [msgSB, setMsgSB] = useState("");
  const { setUser } = useUser();

  const handleSubmit = (values, { resetForm }) => {
    (async () => {
      try {
        const un = await getUsernames();
        if (values.username === "admin") {
          const dataAdmin = await getAdmin({ username: values.username });
          const comp = await bcrypt.compare(
            values.password,
            dataAdmin.result.password
          );
          if (comp) {
            setUser(dataAdmin.result);
            history.go(0);
          } else {
            throw new Error("Usuario o contraseña incorrectos");
          }
        } else {
          if (un.result.includes(values.username)) {
            const dataUser = await getUser({ username: values.username });
            const closeCircle = await getCloseCircle({
              username: values.username,
            });
            const notifications = await getNotifications({
              username: values.username,
            });
            const petitions = await getPetitions({
              username: values.username,
            });

            const comp = await bcrypt.compare(
              values.password,
              dataUser.result.password
            );
            if (comp) {
              // guardar usuario en el context

              setUser({
                ...dataUser.result,
                closeCircle: closeCircle,
                notifications: notifications,
                petitions: petitions,
              });
              // history.push("/home");
              history.go(0);
            } else {
              throw new Error("Usuario o contraseña incorrectos");
            }
          } else {
            throw new Error("Este nombre de usuario no esta registrado");
          }
        }
      } catch (e) {
        setMsgSB(e.message);
        setOpenSB(true);
        setTimeout(() => {
          resetForm(initialValues);
        }, 1500);
      }
    })();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        display="flex"
        style={{ marginLeft: "19%", marginTop: "100px", marginBottom: "30px" }}
      >
        <img src={Logo1} alt="logo" width="350px" />
      </Box>
      <Paper elevation={7} style={{ padding: "20px 30px" }}>
        <Box m={1} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
        </Box>
        <Box m={3} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, { resetForm });
          }}
        >
          {({ submitForm, errors, isSubmitting }) => (
            <>
              <Field
                component={TextField}
                name="username"
                label="Nombre de usuario"
                fullWidth
                variant="outlined"
                error={errors.username !== undefined}
                helperText={errors.username}
              />
              <Box m={2} />
              <Field
                component={TextField}
                label="Contraseña"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                error={errors.password !== undefined}
                helperText={errors.password}
              />
              <Box m={4} />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Entrar
              </Button>
            </>
          )}
        </Formik>
        <Box m={1} />
        <Box display="flex" justifyContent="flex-end">
          <Link href="/register" variant="body2">
            {"¿No tiene una cuenta? Registrarse"}
          </Link>
        </Box>
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={openSB}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSB(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSB(false);
          }}
          severity="error"
        >
          {msgSB}
        </Alert>
      </Snackbar>
    </Container>
  );
}
