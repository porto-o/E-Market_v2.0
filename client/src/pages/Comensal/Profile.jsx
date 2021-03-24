import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { FuncionesPerfil, MiLista, MisPedidos, MetodosPago} from "../../components/Comensal/Cards";

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




const profile = () => {
    const classes = new useStyles();
    return(
        <div className={classes.root} >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        <Paper className={classes.header}>
                            Mi Perfil &nbsp; &nbsp;
                        </Paper>
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Grid container spaicing={3} direction="column">
                        <Grid item>
                            <FuncionesPerfil />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} style={{textAlign: "centes"}}>
                    <Grid container spaicing={3} direction="row">
                        <Grid item>
                            <MiLista />
                        </Grid>
                        <Grid item>
                            <MisPedidos />
                        </Grid>
                    </Grid>
                    <Grid container spaicing={3} direction="row">
                        <Grid item>
                            <MetodosPago />
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
};

export default profile;