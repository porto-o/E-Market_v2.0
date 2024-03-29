import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { SignInApi } from "../../api/RestaurantApi";
import { notification } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const SignInRestaurant = () => {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await SignInApi(inputs);

    if (result.message) {
      notification["error"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({
        message: "Bienvenido",
        style: { width: 500, marginTop: 50 },
      });
      window.location.href = "/restaurante";
    }
  };

  return (
    <>
      <div className={classes.root} onChange={changeForm} onSubmit={login}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              ¡Vamos a trabajar!
            </Typography>
            <form
              action="/signinRestaurant"
              method="POST"
              className={classes.form}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nombre del Restaurante"
                name="userName"
                autoComplete
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Inciar sesión
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link to={"/signup"}>
                    {"No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Container>
      </div>
    </>
  );
};

export default SignInRestaurant;
