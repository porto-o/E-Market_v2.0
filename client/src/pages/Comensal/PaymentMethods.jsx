import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";


const useStyles = makeStyles((theme) =>({

    root:{flexGrow: 1},
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

}) );


const paymentMethods = () => {
    const classes = new useStyles();
    return(
        <div className={classes.root}>
            <Grid xs={12} className={classes.header}>
                <Typography variant="h4">
                    Agregar Métodos de Pago
                </Typography>
                <br></br>
                        <br></br>
                        <br></br>
            </Grid>
            <Grid container xs={12} spacing="10" >
                <Grid xs={6}>
                <Grid direction="column" elevation={0}>
                    <Paper variant="outlined" className={classes.Paper}>
                        <br></br>
                        <Grid alignItems="flex-end">
                            <Typography variant="h6">
                                &nbsp; &nbsp;Nombre: &nbsp; &nbsp;
                                <TextField type="Text" label="Nombre"/>
                            </Typography>
                        </Grid>
                        <br></br>
                        <br></br>
                        <br></br>
                        <Grid xs={6} alignContent="center" sm={6}>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            <Button variant="contained" size="large">
                                Agregar Mercado Pago
                            </Button>
                            <br></br>
                            <br></br>
                            &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                            <Button variant="contained" size="large">
                                &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                Agregar PayPal
                                &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; 
                            </Button>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Grid>
                    </Paper>
                </Grid>
                </Grid>
           
                    <Grid xs={6} alignItems="column">
                            <Paper variant="outlined">
                                <Grid xs={6} alignItems="baseline">
                                    <Typography variant="h5">
                                        Eliminar Métodos de Pago
                                    </Typography>
                            <br></br>
                                </Grid>
                                <Grid xs={6} direction="row" alignItems="flex-end">
                                    <form>
                                        
                                        <Typography variant="h6">
                                           &nbsp;&nbsp; &nbsp;Método de Pago ##:  
                                        </Typography>
                                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                        <Button variant="contained" >
                                            Eliminar
                                        </Button> 
                                        <Typography variant="h6">
                                        &nbsp;&nbsp; &nbsp; Método de Pago ##
                                        </Typography>
                                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                        <Button variant="contained" >
                                                Eliminar
                                        </Button> 
                                        <Typography variant="h6">
                                        &nbsp;&nbsp; &nbsp;Método de Pago ##
                                        </Typography>
                                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
                                        <Button variant="contained" >
                                                Eliminar
                                        </Button> 
                                    </form>
                                    <br></br>
                                    
                                </Grid>
                            </Paper>
                    </Grid>
            </Grid>
        </div>
    );
}

export default paymentMethods