import React, { Component } from "react";
import { Result, Button } from "antd";
export default class Success extends Component {
  render() {
    return (
      <div>
        <Result
          status="success"
          title="Gracias por comprar con E-Market!"
          subTitle="El ticket de tu compra te llegará al correo registrado en el pago."
          extra={[
            <Button type="primary" key="console" href="/comensal">
              Inicio
            </Button>,
          ]}
        />
      </div>
    );
  }
}
