import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import {getPresentacionApi} from "../../api/RestaurantApi";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";
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

  const [stateNombre, setNombre] = useState("")
  const [statePres, setPres] = useState("")
  const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))


const llenar = () => {
  window.onload = async () => {
    const result = await getPresentacionApi(token.id)
    if (result.message) {
      console.log("no hay")
    } else {
      console.log(result.nombreRestaurante)


    }
    setNombre(result.nombreRestaurante, stateNombre)
    setPres(result.descripcion, statePres)

  }
}
llenar()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image= "https://image.freepik.com/free-vector/restaurant-logo-design_1078-72.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {stateNombre}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {statePres}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
