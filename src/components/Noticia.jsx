import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import React from "react";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  media: {
    height: 140,
  },
});

const Noticia = ({ item }) => {
  const classes = useStyles();

  return (
    <Box display="flex" minWidth="350px" width="40%" paddingBottom="50px">
      <Card className={classes.card}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <CardMedia
              className={classes.media}
              image={item.urlToImage}
              title="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
            </CardContent>
          </Box>

          <CardActions>
            <Button size="small" color="primary" href={item.url}>
              Ir a la noticia
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default Noticia;
