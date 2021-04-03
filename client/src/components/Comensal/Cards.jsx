import React, { useState } from "react";
import { Card, Form, Input, notification, Modal } from "antd";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, ButtonGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import {
  deleteAccountComensalApi,
  changeNameComensalApi,
  changePasswordComensalApi,
} from "../../api/ComensalApi";
import { logout } from "../../api/auth";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

export function Restaurantes() {
  return (
    <Button href="">
      <Grid container spacing={3} direction="row">
        <Grid item xs={6}>
          <Avatar src="https://porfirios.com.mx/blog/wp-content/uploads/2019/03/Apertura-TOREO-blog-604x270.png"></Avatar>
        </Grid>
        <Grid item xs={6}>
          <Typography component="h5" variant="h6">
            PORFIRIO'S Menú
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
}

export function FuncionesPerfil() {
  const [form] = Form.useForm();
  const [inputsN, setInputsN] = useState({
    userName: "",
  });
  const changeFormN = (e) => {
    setInputsN({
      ...inputsN,
      [e.target.name]: e.target.value,
    });
  };
  const deleteAccount = async (e) => {
    e.preventDefault();
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    const id = token.id;
    const result = await deleteAccountComensalApi(id);

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
    }
    logout();
    window.location = "/";
  };
  const changeName = async (e) => {
    e.preventDefault();
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    const id = token.id;
    const name = inputsN.userName;
    const result = await changeNameComensalApi(id, name);

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
    }
  };
  const changePassword = async (values) => {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    const id = token.id;
    const newPass = values.password;
    const result = await changePasswordComensalApi(id, newPass);
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
    }
  };
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          ¿Qué deseas hacer?
        </Typography>
        <ButtonGroup
          orientation="vertical"
          color="Secondary"
          aria-label="vertical contained primary button group"
          variant="text"
        >
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  size="large"
                  color="Secondary"
                  {...bindTrigger(popupState)}
                >
                  Cambiar Nombre
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <Paper>
                    <div onChange={changeFormN} onSubmit={changeName}>
                      <form>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="useName"
                          label="Nuevo Nombre"
                          name="userName"
                          autoComplete="NUEVO NOMBRE"
                          autoFocus
                        />
                        <Button
                          size="large"
                          color="secondary"
                          type="submit"
                          variant="contained"
                          onClick={popupState.close}
                        >
                          Cambiar
                        </Button>
                      </form>
                    </div>
                  </Paper>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button
                  size="large"
                  color="Secondary"
                  {...bindTrigger(popupState)}
                >
                  Cambiar Contraseña
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <Paper>
                    <Form
                      {...formItemLayout}
                      form={form}
                      name="register"
                      onFinish={changePassword}
                      scrollToFirstError
                    >
                      <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[
                          {
                            required: true,
                            message: "Porfavor ingresa una contraseña!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password />
                      </Form.Item>

                      <Form.Item
                        name="confirm"
                        label="Confirmar contraseña"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Porfavor confirma tu contraseña!",
                          },
                          ({ getFieldValue }) => ({
                            validator(value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                "Las contraseñas no coinciden!"
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item {...tailFormItemLayout}>
                        <Button
                          type="primary"
                          size="large"
                          color="secondary"
                          variant="contained"
                          onClick={popupState.close}
                        >
                          Cambiar
                        </Button>
                      </Form.Item>
                    </Form>
                  </Paper>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>

          <div onSubmit={deleteAccount}>
            <form action="/deleteAccountComensal" method="POST" noValidate>
              <Button size="large" color="secondary" type="submit">
                Borrar Registro
              </Button>
            </form>
          </div>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

export function MisPedidos() {
  const { Meta } = Card;
  return (
    <Box size="20%">
      <Button href="/comensal/tickets">
        <Card
          hoverable
          cover={
            <img
              alt="Mis Pedidos"
              src="https://image.freepik.com/free-vector/illustration-hands-holding-junk-food_53876-26715.jpg"
            />
          }
        >
          <Meta title="Mis Pedidos" />
        </Card>
      </Button>
    </Box>
  );
}

export function MiLista() {
  const { Meta } = Card;

  return (
    <Button href="/comensal">
      <Card
        hoverable
        cover={
          <img
            alt="Mi Lista"
            src="https://image.freepik.com/free-vector/people-healthy-food_24908-55176.jpg"
          />
        }
      >
        <Meta title="Mi Lista" />
      </Card>
    </Button>
  );
}

export function MisTickets() {
  const { Meta } = Card;
  return (
    <Button href="">
      <Card hoverable cover={<img alt="Mis Tickets" src="" />}>
        <Meta title="Mis Tickets" />
      </Card>
    </Button>
  );
}

export function MetodosPago() {
  const { Meta } = Card;

  const mensaje = () => {
    Modal.info({
      title: "INFORMACIÓN IMPORTANTE",
      content: (
        <div>
          <p>
            Actualmente solo estamos aceptado pagos por tarjeta de crédito.
            Dentro de poco podrás almacenar tus métodos de pago.
          </p>
        </div>
      ),
      onOk() {},
    });
  };
  return (
    <Button onClick={mensaje}>
      <Card
        hoverable
        cover={
          <img
            alt="Métodos de Pago"
            src="https://image.freepik.com/free-vector/online-mobile-banking-internet-banking-isometric-design-concept-cashless-society-security-transaction-via-credit-card_73903-310.jpg"
          />
        }
      >
        <Meta title="Métodos de Pago" />
      </Card>
    </Button>
  );
}

//https://www.flaticon.es/premium-icon/icons/svg/1668/1668931.svg
