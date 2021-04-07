import React, {Component} from 'react';
import { Popover, Button } from 'antd';
import {getInfoResApi} from "../../api/ComensalApi";
var phone;
var codeRes;
var email;
var admin;
var presentation;
var content;

class PopOverInfo extends Component {

    state = {
        visible: false,
        phone: "",
        code: "",
        emai: "",
        presentation: "",
        admin: ""

    };

    handleInfo = async () => {
        const info = await getInfoResApi(this.props.content);
        phone = info.phone;
        codeRes = info.code;
        email = info.email;
        admin = info.admin;

        this.setState({
            phone: phone,
            code: codeRes,
            emai: email,
            admin: admin
        })
    }

    handleVisibleChange = visible => {
        this.setState({ visible });
        this.handleInfo()
    };

    handleContenido = () => {
        return(
            <div>
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
                    title="Title"
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button type="primary">Click me</Button>
                </Popover>
            </div>
        );
    }
}

export default PopOverInfo;