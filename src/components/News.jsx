import { Box, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import React from "react";
import Noticia from "./Noticia";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  media: {
    height: 140,
  },
  titulo: {
    margin: "30px",
  },
});

const News = ({ news }) => {
  const classes = useStyles();

  return (
    <>
      <h2 className={classes.titulo}>
        Noticias sobre el covid de los últimos 7 días en españa
      </h2>

      <Box
        display="flex"
        flexGrow={1}
        flexWrap="wrap"
        justifyContent="space-around"
      >
        {news ? (
          news
            .slice(0)
            .reverse()
            .map((item, idk) => <Noticia key={idk} item={item} />)
        ) : (
          <CircularProgress
            style={{
              marginTop: "40px",
            }}
          />
        )}
      </Box>
    </>
  );
};

export default News;
