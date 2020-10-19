import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import * as yup from "yup";
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
  prov: yup
    .string()
    .matches(
      "^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]*$",
      "Introduce una provincia válida"
    ),
  city: yup
    .string()
    .matches(
      "^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF ]*$",
      "Introduce una ciudad válida"
    ),
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialValues = {
  username: "",
  name: "",
  email: "",
  password: "",
  repassword: "",
  prov: "",
  city: "",
};

const DialogAdd = ({ open, setOpen }) => {
  const [openSucc, setOpenSucc] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [msgSB, setMsgSB] = useState("");

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
          resetForm(initialValues);
        }, 1500);
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
    <>
      {/* DIALOG ADD */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        scroll={"paper"}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Crear un usuario</DialogTitle>

        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
        >
          {({ submitForm, errors, values, isSubmitting }) => {
            return (
              <>
                <DialogContent dividers={true}>
                  <DialogContentText style={{ marginBottom: "0px" }}>
                    Datos de usuario
                  </DialogContentText>
                  <Divider />
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
                  <Box m={2} />
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Field
                      component={TextField}
                      label="Provincia"
                      name="prov"
                      variant="outlined"
                      fullWidth
                      error={errors.prov !== undefined}
                      helperText={errors.prov}
                    />
                    <Box ml={3} />
                    <Field
                      component={TextField}
                      label="Ciudad"
                      name="city"
                      variant="outlined"
                      fullWidth
                      error={errors.city !== undefined}
                      helperText={errors.city}
                    />
                  </Box>
                </DialogContent>
                <Box>
                  <DialogActions>
                    <Box display="flex">
                      <Button onClick={() => setOpen(false)} color="primary">
                        Cancelar
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        onClick={submitForm}
                        color="primary"
                      >
                        Crear usuario
                      </Button>
                    </Box>
                  </DialogActions>
                </Box>
              </>
            );
          }}
        </Formik>
      </Dialog>
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
    </>
  );
};

export default DialogAdd;
