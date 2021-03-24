import React, {useState} from "react";
import {Card, Form, Input, notification} from 'antd';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Button, ButtonGroup} from "@material-ui/core";
import {
    changeNameRestaurantApi,
    CodeApi,
    deleteAccountRestaurantApi,
    changePresentationRestaurantApi,
    changePasswordRestaurantApi,
    getPresentacionApi
} from "../../api/RestaurantApi";
import {ACCESS_TOKEN} from "../../utils/constants";
import jwtDecode from "jwt-decode";
import { logout } from "../../api/auth";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from '@material-ui/core/Menu';
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

export function PedidosM() {
    const {Meta} = Card;
    return (
        <Button href="/restaurante/record">
            <Card
                hoverable
                cover={<img alt="example"
                            src="https://gourmetdemexico.com.mx/wp-content/uploads/2018/02/platillos-tradicionales-chinos.jpg"/>}
            >
                <Meta title="Pedidos al Momento"/>
            </Card>
        </Button>
    )
}

export function EditarM() {
    const {Meta} = Card;
    return (
        <Button href="restaurante/editmenu">
            <Card
                hoverable
                cover={<img alt="example"
                            src="https://porfirios.com.mx/blog/wp-content/uploads/2019/03/BLOG-presentacion-comida-mexicana-604x270.png"/>}
            >
                <Meta title="Editar Menú"/>
            </Card>
        </Button>
    )
}

export function HistorialP() {
    const {Meta} = Card;
    return (
        <Button href="/restaurante/history">
            <Card
                hoverable
                cover={<img alt="example"
                            src="https://static-abcblogs.abc.es/wp-content/uploads/sites/253/2020/03/taco-langostinos-kQMI-510x287@abc-516x315.jpg"/>}
            >
                <Meta title="Historial de Pedidos"/>
            </Card>
        </Button>
    )
}

export function Pin() {

    const [stateCode, setCode] = useState(0)
    const getCode =  () => {
        window.onload = async () => {
            const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
            const id = token.id
            const result = await CodeApi(id)
            console.log(result)
            setCode(result.code, stateCode)
        }

    }
    getCode()
    const {Meta} = Card;
    return (
        <Form onSubmitCapture={getCode}>
            <Card hoverable>
                <Meta title="Comparte este código: "/>
                <div id="codigo">{stateCode}</div>
            </Card>

        </Form>

    )
}

export function Nosotros() {
    const {Meta} = Card;

    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const id = token.id
    var pres = ""

    const [statePres, setPres] = useState()
    const presentacion = () => {
        window.onload = async () => {
            const result = await getPresentacionApi(id)
            console.log(result)
            if (result.message) {
                console.log("no hay")
            } else {
                pres = result.pres
                setPres(pres, statePres)
            }
        }
    }

    presentacion()



    return (
        <Card
            cover={<img alt="example"
                        src="https://porfirios.com.mx/blog/wp-content/uploads/2019/03/Apertura-TOREO-blog-604x270.png"/>}
        >
            <Meta title="Nosotros" description={statePres}/>
        </Card>
    )
}

export function Perfil() {
    const {Meta} = Card;
    return (
        <Card
            cover={<img alt="example"
                        src="https://porfirios.com.mx/blog/wp-content/uploads/2019/03/Apertura-TOREO-blog-604x270.png"/>}
        >
            <Meta title={jwtDecode(localStorage.getItem(ACCESS_TOKEN)).userName} description="RESTAURANTE"/>
        </Card>
    )
}

export function FuncionesPerfil() {
    const [form] = Form.useForm();
    const changeName = async (values) => {
        const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const id = token.id
        const newName = values.userName;
        const result = await changeNameRestaurantApi(id, newName);
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
    const changePresentation = async (values) => {
        const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const id = token.id
        const newPresentation = values.presentation;
        const result = await changePresentationRestaurantApi(id, newPresentation);
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
        const id = token.id
        const newPass = values.password;
        const result = await changePasswordRestaurantApi(id, newPass);
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
    const deleteAccount = async(e) => {
        e.preventDefault();
        const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const id = token.id
        const result = await deleteAccountRestaurantApi(id);

        if(result.response){
            notification["error"]({
                message: result.message,
                style: { width: 500, marginTop: 50 },
            })
        }else{
            notification["success"]({
                message: result.message,
                style: { width: 500, marginTop: 50 },
            });

        }

        logout();
        window.location = "/";

    };
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    ¿Qué deseas hacer?
                </Typography>
                <ButtonGroup orientation="vertical"
                             color="Secondary"
                             aria-label="vertical contained primary button group"
                             variant="text">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button size="large"
                                        color="Secondary"
                                        {...bindTrigger(popupState)}>
                                    Cambiar Nombre
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <Paper>
                                        <Form {...formItemLayout}
                                              form={form}
                                              name="register"
                                              onFinish={changeName}
                                              scrollToFirstError
                                        >
                                            <Form.Item
                                                name="userName"
                                                label="Nombre de usuario"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Porfavor ingresa el nombre de usuario!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout}>
                                                <Button type="primary"
                                                        size="large"
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={popupState.close}>
                                                    Cambiar
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Paper>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button size="large"
                                        color="Secondary"
                                        {...bindTrigger(popupState)}>
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
                                                        validator(rule, value) {
                                                            if (!value || getFieldValue("password") === value) {
                                                                return Promise.resolve();
                                                            }

                                                            return Promise.reject("Las contraseñas no coinciden!");
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input.Password />
                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout}>
                                                <Button type="primary"
                                                        size="large"
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={popupState.close}>
                                                    Cambiar
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </Paper>
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button size="large"
                                        color="Secondary"
                                        {...bindTrigger(popupState)}>
                                    Cambiar Presentación
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    <Paper>
                                        <Form {...formItemLayout}
                                              form={form}
                                              name="register"
                                              onFinish={changePresentation}
                                              scrollToFirstError
                                        >
                                            <Form.Item
                                                name="presentation"
                                                label="Presentación"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Porfavor ingresa la presentación!",
                                                    },
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item {...tailFormItemLayout}>
                                                <Button type="primary"
                                                        size="large"
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={popupState.close}>
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
                        <form
                            action="/deleteAccountRestaurant"
                            method="POST"
                            noValidate>

                            <Button size="large"
                                    color="secondary"
                                    type="submit">
                                Borrar Registro
                            </Button>
                        </form>
                    </div>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}

export function EM() {
    return (
        <Card
            cover={<img alt="example"
                        src="https://static-abcblogs.abc.es/wp-content/uploads/sites/253/2020/03/taco-langostinos-kQMI-510x287@abc-516x315.jpg"/>}
        >
            <CardContent>
                Tacos de Camarón
                <br></br>
                Costo
                <br></br>
                Tiempo de preparación
                <br></br>
            </CardContent>
        </Card>
    )
}