import React, { Component } from "react";
import { Transfer,  notification, ConfigProvider, Image } from "antd";
import { useParams } from "react-router";
import { getMenuApi, ordenarApi } from "../../api/ComensalApi";
import { IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import jwtDecode from "jwt-decode";
import es_ES from "antd/lib/locale/es_ES";

let nombreVista, descripcionVista, fotoVista, precioVista;
let arrayNombres = [];
let arrayDescripcion = [];
let arrayFoto = [];
let arrayPrecio = [];
var arrayOrden = [];

export default class Menu extends Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = async () => {
    const el = document.getElementById("paramsUrl");
    const nombre = el.textContent || el.innerText;
    const targetKeys = [];
    var mockData = [];

    const result = await getMenuApi(nombre);
    if (result.message) {
      notification.info({
        message: result.message,
        placement: "bottomLeft",
      });
    } else {
      result.filter(function (el) {
        nombreVista = el.nombre;
        descripcionVista = el.descripcion;
        precioVista = el.precio;
        fotoVista = el.dishPhoto;
        arrayNombres.push(nombreVista);
        arrayDescripcion.push(descripcionVista);
        arrayPrecio.push(precioVista);
        arrayFoto.push(fotoVista);
        return null
      });

      for (let i = 0; i < arrayNombres.length; i++) {
        const data = {
          key: arrayNombres[i],
          title: arrayNombres[i],
          description: arrayDescripcion[i],
          precio: arrayPrecio[i],
          foto: arrayFoto[i],
          chosen: 0,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.setState({ mockData, targetKeys });
      console.log(this.state.mockData)
    }
  };

  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
    arrayOrden = targetKeys;
  };

  handleOrdenar = async () => {
    const el = document.getElementById("paramsUrl");
    const nombre = el.textContent || el.innerText;
    const token = jwtDecode(localStorage.getItem("accessToken"));
    const token2 = localStorage.getItem("accessToken");
    // eslint-disable-next-line
    if (arrayOrden == "" || arrayOrden === null || !arrayOrden) {
      notification.info({
        message: "Porfavor selecciona un platillo.",
        placement: "bottomLeft",
      });
    } else {
      const id = token.id;
      // eslint-disable-next-line
      await ordenarApi(arrayOrden, nombre, id);
      while (arrayOrden.length > 0) {
        arrayOrden.pop();
      }
      window.location = `/comensal/status/${token2}/${nombre}`;
    }
  };

  render() {
    return (
      <div align={"center"}>
        <ConfigProvider locale={es_ES}>
          <Child />
          <br></br>
          <br></br>
          <Transfer
            dataSource={this.state.mockData}
            listStyle={{
              width: 800,
              height: 400,
              alignContent: "center",
            }}
            operations={["Añadir", "Quitar"]}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            pagination
            render={(item) => (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tr>
                  <th style={{ borderCollapse: "collapse" }}>Foto</th>
                  <th style={{ borderCollapse: "collapse" }}>Nombre</th>
                  <th style={{ borderCollapse: "collapse" }}>Precio (MXN)</th>
                </tr>
                <tr>
                  <td style={{ borderCollapse: "collapse", padding: "5px" }}>
                    <Image
                      src={item.foto}
                      alt="Foto platillo"
                      style={{ width: "150px" }}
                    />
                  </td>
                  <td style={{ borderCollapse: "collapse", padding: "5px" }}>
                    <p>{item.title}</p>
                  </td>
                  <td style={{ borderCollapse: "collapse", padding: "5px" }}>
                    <p>$ {item.precio}</p>
                  </td>
                </tr>
              </table>
            )}
          />
          <IconButton
            id="btnOrdenar"
            color="primary"
            aria-label="add to shopping cart"
            onClick={this.handleOrdenar}
          >
            <AddShoppingCartIcon /> Ordenar
          </IconButton>
        </ConfigProvider>
      </div>
    );
  }
}

function Child() {
  let { nombres } = useParams();
  return (
    <>
      <span id="paramsUrl">
        <b>{nombres}</b>
      </span>
    </>
  );
}
