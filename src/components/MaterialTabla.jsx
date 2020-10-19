import React, { useState } from "react";
import MaterialTable from "material-table";

function MaterialTabla({ datos }) {
  const [columns, setColumns] = useState([
    { title: "Username", field: "username" },
    {
      title: "Nombre",
      field: "name",
    },
    { title: "Ciudad", field: "city" },
  ]);

  const [data, setData] = useState([
    { username: "luisdcelis", name: "Luis de Celis", city: "San Fernando" },
  ]);

  return (
    <MaterialTable
      title="Añadir personas"
      columns={columns}
      data={data}
      options={{
        paging: true,
        pageSize: 5, // make initial page size
        emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
      }}
      localization={{
        body: {
          emptyDataSourceMessage: "No hay registros que mostrar",
          addTooltip: "Añadir",
          deleteTooltip: "Eliminar",
          editTooltip: "Editar",
          filterRow: {
            filterTooltip: "Filtrar",
          },
          editRow: {
            deleteText: "¿Quieres borrar esta fila?",
            cancelTooltip: "Cancelar",
            saveTooltip: "Guardar",
          },
        },

        header: {
          actions: "Acciones",
        },
        pagination: {
          labelDisplayedRows: "{from}-{to} de {count}",
          labelRowsSelect: "Líneas",
          labelRowsPerPage: "Líneas por página:",
          firstAriaLabel: "Primera página",
          firstTooltip: "Primera página",
          previousAriaLabel: "Página anterior",
          previousTooltip: "Página anterior",
          nextAriaLabel: "Página siguiente",
          nextTooltip: "Página siguiente",
          lastAriaLabel: "Última página",
          lastTooltip: "Última página",
        },
        toolbar: {
          addRemoveColumns: "Agregar o quitar columnas",
          nRowsSelected: "{0} pagina(s) seleccionada(s)",
          showColumnsTitle: "Ver las columnas",
          showColumnsAriaLabel: "ver las columnas",
          searchTooltip: "Buscar",
          searchPlaceholder: "Buscar",
        },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);

              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);

              resolve();
            }, 1000);
          }),
      }}
    />
  );
}
export default MaterialTabla;
