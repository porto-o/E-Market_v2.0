import React, { Component } from "react";
import { Popover } from "antd";
import { getInfoResApi } from "../../api/RestaurantApi";
import "../utils/StyleUpload.css";
import Button from "@material-ui/core/Button";

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
    photo: "",
  };

  handleInfo = async () => {
    console.log(this.props.nombre);
    const info = await getInfoResApi(null, this.props.nombre);

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
      photo: photo,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
    this.handleInfo();
  };

  handleContenido = () => {
    return (
      <div style={{ alignContent: "center", alignItems: "center" }}>
        <p>
          <b>Número:</b> {this.state.phone}
        </p>
        <p>
          <b>E-Mail:</b> {this.state.emai}
        </p>
        <p>
          <b>Administrador:</b> {this.state.admin}
        </p>
        <p>
          <b>Código:</b> {this.state.code}
        </p>
      </div>
    );
  };

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
          <Button size="medium" variant="contained" color={this.props.color}>
            Contacto
          </Button>
        </Popover>
      </div>
    );
  }
}

export default PopOverInfo;
