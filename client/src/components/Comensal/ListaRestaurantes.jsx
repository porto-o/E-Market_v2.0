import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import {getRestaurantApi} from "../../api/ComensalApi";
import { notification } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "../../pages/Comensal/Menu";
import EliminarRest from "../../pages/Comensal/EliminarRestaurante";
import ListaRestaurantesTest from "./ListaRestaurantesTest";

export default function ListaRestaurantes(props) {

  const [stateNombre, setNombres] = useState([]);
  var nombres;
  var id;
  var arrayNombres = [];

  const mostrar = () => {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    window.onload = async (e) => {
      e.preventDefault();

      const idComensal = token.id;
      const result = await getRestaurantApi(idComensal);

      if (result.message) {
        notification.info({
          message:
            "Aún no hay restaurantes registrados en tu lista, añade uno en la parte derecha de tu pantalla.",
          placement: "bottomLeft",
        });
      } else {
        result.filter(function (el) {
          nombres = el.restaurantName;

          id = el._id;
          arrayNombres.push(nombres);

          // eslint-disable-next-line
          return nombres, id;
        });
        setNombres([...arrayNombres, ...stateNombre]);
      }
    };
  };
  mostrar();

  return (
    <Router>

<ListaRestaurantesTest/>
    </Router>

  );
}

export const Menus = () => {
  window.location.reload();
  return <Menu />;
};

export const Eliminar = () => {
  window.location.reload();
  return <EliminarRest />;
};
