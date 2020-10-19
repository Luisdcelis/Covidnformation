import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const ItemCard = ({ img, title, body, to, handleClick }) => {
  const history = useHistory();
  return (
    <Card style={{ maxWidth: "300px" }} elevation={10}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          image={img}
          style={{
            height: "150px",
            width: "150px",
            display: "block",
            marginLeft: "auto",
            marginTop: 20,
            marginRight: "auto",
          }}
          title="titulo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
