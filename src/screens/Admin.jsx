import { Box } from "@material-ui/core";
import React, { useState } from "react";
import Add from "../assets/add.png";
import Delete from "../assets/delete.png";
import Modify from "../assets/modify.png";
import DialogAdd from "../components/DialogAdd";
import DialogDelete from "../components/DialogDelete";
import DialogEdit from "../components/DialogEdit";
import ItemCard from "../components/ItemCard";
import NavBarNoCovid from "../components/NavBarNoCovid";

const Admin = () => {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  return (
    <>
      <NavBarNoCovid />
      <Box m={10} />
      <Box display="flex" flexDirection="row" justifyContent="space-around">
        <ItemCard
          img={Add}
          title="Añadir un usuario"
          body="Aquí podrás crear un usuario y añadirlo a la base de datos"
          handleClick={() => {
            setOpenDialogAdd(true);
          }}
        />
        <ItemCard
          img={Delete}
          title="Eliminar un usuario"
          body="Aquí podrás eleminar el usuario que desees"
          handleClick={() => {
            setOpenDialogDelete(true);
          }}
        />
        <ItemCard
          img={Modify}
          title="Modificar un usuario"
          body="Aquí podrás modificar un usuario seleccionado"
          handleClick={() => {
            setOpenDialogEdit(true);
          }}
        />
      </Box>
      <DialogAdd
        open={openDialogAdd}
        setOpen={(value) => setOpenDialogAdd(value)}
      />
      <DialogDelete
        open={openDialogDelete}
        setOpen={(value) => setOpenDialogDelete(value)}
      />
      <DialogEdit
        open={openDialogEdit}
        setOpen={(value) => setOpenDialogEdit(value)}
      />
    </>
  );
};

export default Admin;
