import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FastfoodTwoToneIcon from '@material-ui/icons/FastfoodTwoTone';
import {logout} from "../../api/auth";
import Button from "@material-ui/core/Button";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const logoutUser = () => {
    localStorage.removeItem("CODE");
    logout();
    window.location = "/"
}

const NavbarRest = () => {


    const classes = useStyles();
    if(localStorage.getItem(ACCESS_TOKEN)){
        var token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
        var nombre = token.userName
    }

    return (
        <div className={classes.root}>

            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <FastfoodTwoToneIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        E-Market de {nombre}
                    </Typography>

                    <Button href="/restaurante" color="inherit">Inicio</Button>
                    <Button href="/restaurante/profile" color="inherit">Perfil</Button>
                    <Button href="/restaurante/record" color="inherit">Ordenes</Button>
                    <Button color="inherit" onClick={logoutUser}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>

        </div>
    );
};


export default NavbarRest;
