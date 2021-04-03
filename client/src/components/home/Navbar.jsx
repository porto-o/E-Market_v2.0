import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./menuTop.scss";

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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <FastfoodTwoToneIcon />
          </IconButton>
          <Typography
            href="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            E-Market
          </Typography>

          <Menu className="menu-top" mode="horizontal">
            <Menu.Item className="menu-top__item">
              <Link to={"/"}>Inicio</Link>
            </Menu.Item>
            <Menu.Item className="menu-top__item">
              <Link to={"/signin"}>Iniciar Sesión</Link>
            </Menu.Item>
            <Menu.Item className="menu-top__item">
              <Link to={"/signup"}>Registrarse</Link>
            </Menu.Item>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
