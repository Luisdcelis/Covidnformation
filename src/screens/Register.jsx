import { Paper, Snackbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import { createUser, getEmails, getUsernames } from "../services/neo4j_api";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Introduzca el nombre de usuario")
    .min(4, "Mínimo 4 caracteres")
    .max(16, "Máximo 16 caracteres")
    .matches(
      "^[a-zA-Z]+[a-zA-Z0-9]+$",
      "Solo se permiten caracteres alfanuméricos (empezando con una letra)"
    ),
  password: yup.string().required("Introduzca la contraseña"),
  name: yup.string().required("Introduzca el nombre"),
  email: yup
    .string()
    .required("Introduzca el correo electrónico")
    .email("Introduzca un email válido"),
  repassword: yup
    .string()
    .required("Repita la contraseña")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
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
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    marginTop: "1px",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const initialValues = {
  username: "",
  name: "",
  password: "",
  email: "",
  repassword: "",
};

const Register = () => {
  const classes = useStyles();
  const history = useHistory();

  const [openSucc, setOpenSucc] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [msgSB, setMsgSB] = useState("¡Usuario creado correctamente!");

  const handleSubmit = (values, { resetForm }) => {
    const { repassword, ...data } = values;

    (async () => {
      try {
        const un = await getUsernames();
        const em = await getEmails();

        if (un.result.includes(data.username) || data.username === "admin") {
          throw new Error("Este username ya existe");
        } else {
          if (em.result.includes(data.email)) {
            throw new Error("Este email ya esta registrado");
          }
        }

        await createUser(data);
        setOpenSucc(true);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      } catch (e) {
        setMsgSB(e.message);
        setOpenErr(true);
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
        style={{ marginLeft: "19%", marginTop: "75px", marginBottom: "30px" }}
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
            Registrarse
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
                name="email"
                label="Correo electrónico"
                type="email"
                fullWidth
                variant="outlined"
                error={errors.email !== undefined}
                helperText={errors.email}
              />
              <Box m={2} />
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
                name="name"
                label="Nombre completo"
                fullWidth
                variant="outlined"
                error={errors.name !== undefined}
                helperText={errors.name}
              />
              <Box m={2} />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
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
                <Box ml={3} />
                <Field
                  component={TextField}
                  label="Repite contraseña"
                  name="repassword"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={errors.repassword !== undefined}
                  helperText={errors.repassword}
                />
              </Box>

              <Box m={4} />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Registrarme
              </Button>
            </>
          )}
        </Formik>
        <Box m={1} />
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={openSucc}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSucc(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSucc(false);
          }}
          severity="success"
        >
          ¡Usuario registrado con éxito!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErr}
        autoHideDuration={6000}
        onClose={() => {
          setOpenErr(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenErr(false);
          }}
          severity="error"
        >
          {msgSB}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
