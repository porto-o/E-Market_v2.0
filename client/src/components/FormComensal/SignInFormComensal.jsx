import React, { useState } from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { SignInApi } from "../../api/ComensalApi";
import { notification, Collapse } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import FacebookSignIn from "../FormRest/FacebookSignIn";

const { Panel } = Collapse;

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

const SignInComensal = () => {
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
      const element = <CircularProgress />;
      ReactDOM.render(element, document.getElementById("principal"));
      async function load() {
        window.location = "/comensal";
      }
      setTimeout(load, 1500);
    }
  };

  return (
    <>
      <Collapse accordion defaultActiveKey={["1"]}>
        <Panel header="Iniciar sesión con Facebook"  key="1" >
          <FacebookSignIn />
        </Panel>
        <Panel header="Iniciar sesión con E-Market" key="2">
        <div
            id="principal"
            className={classes.root}
            onChange={changeForm}
            onSubmit={login}
            align={"center"}
          >
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                  ¡Vamos a comer!
                </Typography>
                <form
                  action="/signin"
                  method="POST"
                  className={classes.form}
                  noValidate
                >
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Nombre de usuario"
                    name="userName"
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
            </Container>
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default SignInComensal;
