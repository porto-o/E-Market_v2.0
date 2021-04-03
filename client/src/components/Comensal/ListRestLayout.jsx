import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListaRestaurantes from "./ListaRestaurantes";
import Typography from "@material-ui/core/Typography";
import BtnAgregarRest from "./Home/BtnAgregarRest";

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
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const RestaurantesTables = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            <Paper className={classes.header}>Mis restaurantes</Paper>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <BtnAgregarRest />
          <Paper className={classes.paper}>
            <ListaRestaurantes />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export function LoadRestaurants(props) {
  console.log(props);
}
export default RestaurantesTables;
