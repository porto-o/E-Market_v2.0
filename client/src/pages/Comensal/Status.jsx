import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MediaCard from "../../components/Comensal/PresentationCards";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { loadStripe } from "@stripe/stripe-js";
import PaymentIcon from "@material-ui/icons/Payment";
import {
  CoffeeOutlined,
  ProfileOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { notification, Steps } from "antd";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import { getStatusComensalApi, cancelOrderApi } from "../../api/ComensalApi";
import { BASE_PATH } from "../../api/config";
//import {useParams} from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51I76NLIDgbX8kir9ZnIVCe2dFDOsNrbBrhtP6OEGohHsbqYU3qJDKHC0l1fkbtrrLIs6okl7umdxAdiV60pFSL9L00RuOGSI0v"
);

const { Step } = Steps;

const Status = () => {
  const classes = useStyles();
  const [stateStatus, setStatus] = useState(0);

  const cancelOrder = async (event) => {
    //event.preventDefault();
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    const id = token.id;
    const result = await cancelOrderApi(id);
    if (result.response) {
      notification["error"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    } else {
      notification["success"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
      window.location = "/comensal";
    }
  };

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    var id = token.id;
    // Call your backend to create the Checkout Session

    const response = await fetch(
      `${BASE_PATH}/v1/payStripe/${id}`,
      { method: "POST" }
    );
    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  //const {nombreRes} = useParams();

  (function () {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    var id = token.id;
    const getStatus = async () => {
      const result = await getStatusComensalApi(id);
      if (result.message) {
        notification.info({
          message: result.message,
          placement: "bottomRight"
        })
        window.location = "/comensal"
      } else {
        if (result.status === "Enviada") {
          setStatus(0, stateStatus);
          document.getElementById("payButton").hidden = true;
          document.getElementById("cancelButton").hidden = false;
        } else if (result.status === "Cocinando") {
          setStatus(1, stateStatus);
          document.getElementById("cancelButton").hidden = true;
          document.getElementById("payButton").hidden = true;
        } else {
          setStatus(2, stateStatus);
          document.getElementById("cancelButton").hidden = true;
          document.getElementById("payButton").hidden = false;
        }
      }
    };
    setInterval(getStatus, 1000);
  })();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            <Paper className={classes.header}>Estatus de mi Orden</Paper>
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <Steps current={stateStatus}>
              <Step
                title="Recibido"
                description="Tu orden ha sido recibida en la cocina."
                icon={<ProfileOutlined />}
              />
              <Step
                title="Cocinando"
                description="Prepara tu paladar, tu comida se está cocinando."
                icon={<CoffeeOutlined />}
              />
              <Step
                title="Enviando"
                description="En un momento te entregaran tu comida."
                icon={<RocketOutlined />}
              />
            </Steps>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Button onclick={cancelOrder} id={"cancelButton"} hidden={false}>
              <Cancel />
            </Button>
            <Button onClick={handleClick} id={"payButton"} hidden={true}>
              <Pay />
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom className={classes.header}>
              Carta de Presentación
            </Typography>
            <MediaCard />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

const Cancel = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.Button}
      startIcon={<DeleteIcon />}
    >
      Cancelar Orden
    </Button>
  );
};

const Pay = () => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.Button}
      startIcon={<PaymentIcon />}
    >
      Pagar
    </Button>
  );
};

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
  button: {
    margin: theme.spacing(1),
  },
}));

export default Status;
