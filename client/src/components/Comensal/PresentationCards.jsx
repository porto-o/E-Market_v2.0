import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { getInfoResApi } from "../../api/RestaurantApi";
import { useParams } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  const [stateRestaurant, setRestaurant] = useState("");
  const { nombreRes } = useParams();
  const llenar = () => {
    window.onload = async () => {
      const result = await getInfoResApi(null, nombreRes);
      if (result.message) {
        console.log("no hay");
      } else {
        console.log(result.nombreRestaurante);
      }
      setRestaurant(result, stateRestaurant);
    };
  };
  llenar();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={stateRestaurant.photo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {stateRestaurant.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {stateRestaurant.presentation}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

//Este cambio podría traer problemas en el futuro, cambia el codigo de arriba por este si hay problemas
/*
  const [stateNombre, setNombre] = useState("");
  const [statePres, setPres] = useState("");
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));

  const llenar = () => {
    window.onload = async () => {
      const result = await getPresentacionApi(token.id);
      if (result.message) {
        console.log("no hay");
      } else {
        console.log(result.nombreRestaurante);
      }
      setNombre(result.nombreRestaurante, stateNombre);
      setPres(result.descripcion, statePres);
    };
  };
  llenar();
  * */
