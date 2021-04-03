import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import { logout } from "../../api/auth";
import { ACCESS_TOKEN } from "../../utils/constants";
import jwtDecode from "jwt-decode";

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

const NavbarComensal = () => {
  const logoutUser = () => {
    logout();
    window.location = "/";
  };

  const classes = useStyles();

  if (localStorage.getItem(ACCESS_TOKEN)) {
    var token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    var nombre = token.userName;
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
            <FastfoodTwoToneIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} color="inherit">
            E-Market del Comensal {nombre}
          </Typography>

          <Button href="/comensal" color="inherit">
            Inicio
          </Button>
          <Button href="/comensal/profile" color="inherit">
            Perfil
          </Button>
          <Button color="inherit" onClick={logoutUser}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavbarComensal;
