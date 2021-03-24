import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import {Orders, PayList} from "../../components/Comensal/Orders";

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

  
  
const Pay = () => {

    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container justify = "center" direction = "row" alignItems = "stretch" spacing={3}>
              <Grid item xs={8}>
                <Paper className={classes.paper} elevation={3}>
                  <Orders />
                </Paper></Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper} elevation={3}>
                  <PayList />
                </Paper>
                </Grid>
              <Grid item xs={12}>
                  <Paper className={classes.paper} elevation={3}>
                    Elegir método de pago:
                    <br></br>
                    <form action="">
                      <select name="example">
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </form>
                    <br></br>
                    <Button color="secondary">Agregar</Button>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <Button color="secondary">Pagar</Button>
                  </Paper>
              </Grid>
            </Grid>
        </div>
    )
}


export default Pay

