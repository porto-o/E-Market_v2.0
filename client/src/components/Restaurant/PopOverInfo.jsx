import React, {Component} from 'react';
import { Popover, Button } from 'antd';
import {getInfoResApi} from "../../api/RestaurantApi";
import "../utils/StyleUpload.css";

var phone;
var codeRes;
var email;
var admin;
var photo;

class PopOverInfo extends Component {

    state = {
        visible: false,
        phone: "",
        code: "",
        emai: "",
        presentation: "",
        admin: "",
        photo: ""

    };

    handleInfo = async () => {
        const info = await getInfoResApi(this.props.content);
        phone = info.phone;
        codeRes = info.code;
        email = info.email;
        admin = info.admin;
        photo = info.photo;
        this.setState({
            phone: phone,
            code: codeRes,
            emai: email,
            admin: admin,
            photo: photo
        })
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
        this.handleInfo()
    };

    handleContenido = () => {
        return(
            <div style={{width: "50%"}}>
                <img src={this.state.photo} alt="avatar" style={{ width: "100%"}}/>
                <p><b>Número:</b> {this.state.phone}</p>
                <p><b>E-Mail:</b> {this.state.emai}</p>
                <p><b>Administrador:</b> {this.state.admin}</p>
                <p><b>Código:</b> {this.state.code}</p>
            </div>
        )
    }


    render() {
        return (
            <div>
                <Popover
                    content={this.handleContenido}
                    title="INFORMACIÓN DE CONTACTO"
                    trigger="hover"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button type="primary">{this.props.content}</Button>
                </Popover>
            </div>
        );
    }
}

export default PopOverInfo;