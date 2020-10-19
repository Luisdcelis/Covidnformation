import { CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { getUser, getUsernames } from "../services/neo4j_api";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const UserAutocomplete = ({ selected, setSelected, setDataUser }) => {
  const [options, setOptions] = useState([]);

  const [open, setOpen] = useState(false);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const un = await getUsernames();
      const AllUsernames = un.result;
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions(AllUsernames);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (selected !== null) {
      (async () => {
        const dataUser = await getUser({ username: selected });
        setDataUser(dataUser);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={selected}
        onChange={(_event, value) => setSelected(value)}
        options={options}
        loading={loading}
        fullWidth
        noOptionsText="Usuario no encontrado"
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </>
  );
};

export default UserAutocomplete;
