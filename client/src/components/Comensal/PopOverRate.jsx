import React, {Component} from 'react';
import { Popover } from 'antd';
import "../utils/StyleUpload.css";
import Button from "@material-ui/core/Button";
import Rater from "../../components/Comensal/CalificacionEstrellas";

class PopOverRate extends component {

    state = {
        visible: false,
        };

    handleInfo = async () => {
        console.log(this.props.nombre)
        const info = await getInfoResApi(null , this.props.nombre);

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
            <div style={{alignContent: "center", alignItems: "center"}}>
               <Rater/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <Popover
                    content={this.handleContenido}
                    title="INFORMACIÓN DE CONTACTO"
                    trigger="click"
                    visible={this.state.visible}
                    onVisibleChange={this.handleVisibleChange}
                >
                    <Button  variant="contained" color={this.props.color}>Informacion de contacto</Button>
                </Popover>
            </div>
        );
    }
}

export default PopOverRate;


