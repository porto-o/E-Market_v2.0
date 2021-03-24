import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Carousel from "./../components/home/Carrousel";
import Typography from "@material-ui/core/Typography";
import FastfoodOutlined from "@material-ui/icons/FastfoodRounded";
import {CheckCircleTwoTone, HeartTwoTone, QuestionCircleTwoTone} from '@ant-design/icons';
import Carrousel2 from "../components/home/Carrousel2";

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
  textContent: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.primary,
    fontFamily: "Nerko One, cursive"
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            <Paper className={classes.header}>
              Bienvenido a E-Market &nbsp; &nbsp;
              <FastfoodOutlined />
            </Paper>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={3}>
            <Carousel />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={3}>
            <Texto1 />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={3}>
            <Texto2 />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={3}>
            <Carrousel2 />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};



export const Texto1 = () => {
  const classes = useStyles();

  return (
    <div>
      <p>
        <Typography variant="h6" >
          <Paper className={classes.textContent} elevation={0} >
            <h3> Gracias por visitar E-Market. &nbsp;
            <HeartTwoTone twoToneColor="#eb2f96"/></h3>
            <br />
            Durante esta pandemia algo primordial sin duda alguna ha sido la
            salud tanto de nosotros como de quienes nos rodean.
            <br />
            <br />
            Es por eso que en E-Market nos preocupamos por ti y por los tuyos
            ofreciendo un servicio libre de contacto entre usted y su mesero.&nbsp; &nbsp;
            <CheckCircleTwoTone twoToneColor="#52c41a"/>
          </Paper>
        </Typography>
      </p>
    </div>
  );
};

export const Texto2 = () => {
  const classes = useStyles();

  return (
    <div>
      <p>
        <Typography variant="h6" >
          <Paper className={classes.textContent} elevation={0} >
            <h3>¿Que beneficios obtengo si me uno?&nbsp;
            <QuestionCircleTwoTone twoToneColor="#fb5607"/></h3>
            <br />
            Primordialmente tu salud, ya que evitando el contacto 
            en el restaurante contribuyes a que el virus se siga 
            expandiendo.
            <br />
            <br />
            Por otro lado, ¿te importán tus gastos?, !Obviamente!. <br/><br/>
            Es por eso que nos encargamos de almacenar en tu perfil
            todos los tickets de tus compras para que puedas consultarlos
            más tarde o incluso si prefieres, descargarlos.&nbsp; &nbsp;
            <CheckCircleTwoTone twoToneColor="#52c41a"/>
          </Paper>
        </Typography>
      </p>
    </div>
  );
};

export default Home;
