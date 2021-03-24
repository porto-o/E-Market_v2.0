import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { FuncionesPerfil, Perfil, Pin } from "../../components/Restaurant/Cards";

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

const Profile = () => {
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
                <Grid item xs={8}>
                    <Perfil />
                </Grid>
                <Grid item xs={4} style={{ textAlign: "center" }}>
                    <Grid container spaicing={3} direction="column">
                        <Grid item>
                            <Pin />
                        </Grid>
                        <Grid item>
                             <FuncionesPerfil />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>

    )

}

export default Profile