import React, { useState } from "react";
import { List, notification, Space, Image } from "antd";
import { StarOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import {
  eliminarRestauranteApi,
  getRestaurantApi,
} from "../../api/ComensalApi";
import { getInfoResApi } from "../../api/RestaurantApi";
import PopOverInfo from "../Restaurant/PopOverInfo";
import { Button } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import DeleteIcon from "@material-ui/icons/Delete";
const listData = [];

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const TablaListRestaurantes = () => {
  const [stateNombre, setNombres] = useState([]);

  const mostrar = () => {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    window.onload = async (e) => {
      e.preventDefault();

      const idComensal = token.id;
      const result = await getRestaurantApi(idComensal);
      var result2;
      if (result.message) {
        notification.info({
          message:
            "Aún no hay restaurantes registrados en tu lista, tienes algunas recomendaciones en la parte derecha de tu pantalla!",
          placement: "bottomLeft",
        });
      } else {
        result.filter(function (el) {
          const consulta = async () => {
            result2 = await getInfoResApi(null, el.restaurantName);
            listData.push({
              nombres: result2.name,
              photo: result2.photo,
              description: result2.presentation,
            });
            setNombres([...listData, ...stateNombre]);
          };
          consulta();
          return null;
        });
      }
    };
  };
  /**
   *
   */
  const handleDelete = async (nombre) => {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
    const id = token.id;
    const result = await eliminarRestauranteApi(nombre, id);
    if (result.message) {
      notification["warning"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    } else {
      notification["success"]({
        message: "Restaurante eliminado satisfactoriamente!",
        style: { width: 500, marginTop: 50 },
      });
      window.location.reload(true);
    }
  };

  mostrar();
  return (
    <Router>
      
        <List
          itemLayout="vertical"
          size="small"
          pagination={{
            pageSize: 2,
          }}
          dataSource={stateNombre}
          renderItem={(item) => (
            <List.Item
              key={item}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
              ]}
              extra={<Image alt="Remy Sharp" src={item.photo} width={200} />}
            >
              <List.Item.Meta
                avatar={
                  <img
                    alt="avatar restaurante"
                    src="https://img.icons8.com/metro/26/000000/restaurant.png"
                  />
                }
                title={<b>Restaurante: {item.nombres}</b>}
                description={item.description}
              />
              <div>
                <table style={{ width: "400px", alignContent: "center" }}>
                  <td style={{ width: "48%" }}>
                    <Button>
                      <PopOverInfo nombre={item.nombres} color={"primary"} />
                    </Button>
                  </td>
                  <td style={{ width: "30%" }}>
                    <Button
                      size="medium"
                      color="secondary"
                      href={`/comensal/menu/${item.nombres}`}
                      variant="contained"
                    >
                      Ver menú
                    </Button>
                  </td>
                  <td style={{ paddingLeft: "30px" }}>
                    <Button
                      size="small"
                      onClick={() => handleDelete(item.nombres)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </table>
              </div>
            </List.Item>
          )}
        />
    </Router>
  );
};

export default TablaListRestaurantes;
