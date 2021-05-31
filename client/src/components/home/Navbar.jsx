import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import { Link } from "react-router-dom";
import "./menuTop.scss";
import Button from "@material-ui/core/Button";

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

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <Link to={"/"} style={{ color: "white" }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FastfoodTwoToneIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" className={classes.title} color="inherit">
            E-Market
          </Typography>

          <Button href="/" color="inherit">
            Inicio
          </Button>
          <Button href="/signin" color="inherit">
            Iniciar sesión 
          </Button>
          <Button href="/signup" color="inherit">
            Registrarse
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
