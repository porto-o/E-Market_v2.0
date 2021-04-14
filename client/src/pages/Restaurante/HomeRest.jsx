import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {PedidosM, EditarM, HistorialP, Perfil} from "../../components/Restaurant/Cards";


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

const HomeRest = () => {
  const classes = useStyles();

    function FormRow() {
      return (
        <React.Fragment>

          <Grid container direction = "row" alignItems = "stretch" spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container justify = "center" direction = "column" spacing={3}>
                  <Grid item xs={12}>
                      <EditarM />
                  </Grid>
                  <Grid item xs={12}>
                      <HistorialP />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Perfil/>
              </Grid>
          </Grid>
        </React.Fragment>
      );
    }

    return(
      <div className={classes.root}>
        <Grid container direction = "row" alignItems = "stretch" spacing={3}>
          <Grid item xs={12} sm={6}>
              <PedidosM />
          </Grid>
          <Grid item xs={12} sm={6}>
              <FormRow />
          </Grid>
        </Grid>
      </div>
    )

}

export default HomeRest