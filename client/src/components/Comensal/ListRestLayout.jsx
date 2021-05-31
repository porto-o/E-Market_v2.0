import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListaRestaurantes from "./ListaRestaurantes";
import Typography from "@material-ui/core/Typography";
import BtnAgregarRest from "./Home/BtnAgregarRest";
import Recomendados from "./Home/Recomendados";
import { IntroJs as introJs } from "intro.js";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const tutorial = () => {
    introJs(".tabla-restaurantes").start()

}
const RestaurantesTables = () => {
  const classes = useStyles();
  return (
    <div className="tabla-restaurantes" data-intro='Step one'>
      <div className={classes.root}>
          <button onClick={tutorial}>asdfasdfas</button>
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <Typography variant="h4" gutterBottom>
              <Paper className={classes.header}>Mis restaurantes</Paper>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h4" gutterBottom>
              <Paper className={classes.header}>Recomendados</Paper>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper}>
              <BtnAgregarRest />
              <ListaRestaurantes />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Recomendados />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default RestaurantesTables;
