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
import {
  createUser,
  deleteUser,
  getEmails,
  getUser,
  getUsernames,
  updateUser,
} from "../services/neo4j_api";
import MyAutocomplete from "./MyAutocomplete";

const validationSchema = yup.object({
  name: yup.string().required("Introduzca el nombre"),
  email: yup
    .string()
    .required("Introduzca el correo electrónico")
    .email("Introduzca un email válido"),
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
  city: "",
  email: "",
  name: "",
  prov: "",
};

const DialogDelete = ({ open, setOpen }) => {
  const [openSucc, setOpenSucc] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [username, setUsername] = useState(undefined);

  const [msgSB, setMsgSB] = useState("");

  const handleSubmit = (values, { resetForm }) => {
    const { repassword, ...data } = values;

    (async () => {
      try {
        console.log("deleteando ", data.username);
        deleteUser({ username: data.username });
        setOpenSucc(true);
        setTimeout(() => {
          resetForm(initialValues);
          setOpen(false);
        }, 1500);
      } catch (e) {}
    })();
  };

  console.log(username);

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        scroll={"paper"}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Eliminar un usuario</DialogTitle>

        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmit(values, { resetForm })
          }
        >
          {({ submitForm, errors, values, isSubmitting, resetForm }) => {
            return (
              <>
                <DialogContent dividers={true}>
                  <DialogContentText style={{ marginBottom: "0px" }}>
                    Datos de usuario
                  </DialogContentText>
                  <Divider />
                  <Box m={2} />
                  <MyAutocomplete
                    resetForm={(nextState) => {
                      setUsername(nextState.values.username);
                      resetForm(nextState);
                    }}
                  />
                  <Box m={2} />
                  <Field
                    component={TextField}
                    name="email"
                    label="Correo electrónico"
                    type="email"
                    fullWidth
                    disabled={true}
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
                    disabled={true}
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
                      label="Provincia"
                      name="prov"
                      variant="outlined"
                      fullWidth
                      disabled={true}
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
                      disabled={true}
                      error={errors.city !== undefined}
                      helperText={errors.city}
                    />
                  </Box>
                </DialogContent>
                <Box>
                  <DialogActions>
                    <Box display="flex">
                      <Button onClick={() => setOpen(false)} color="secondary">
                        Cancelar
                      </Button>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        onClick={submitForm}
                        color="secondary"
                      >
                        eliminar usuario
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
          ¡Usuario eliminado con éxito!
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

export default DialogDelete;
