import React, { useState } from "react";
import { List, notification, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import { eliminarRestauranteApi, getRestaurantApi } from "../../api/ComensalApi";
import { getInfoResApi } from "../../api/RestaurantApi";
import PopOverInfo from "../Restaurant/PopOverInfo";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";

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
            result2 = await getInfoResApi(el.restaurantName);
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
    //console.log(stateNombre)
    //const filtredData = stateNombre.filter(item => item.nombres !== nombre);
    //setNombres(["",...stateNombre])
    //setNombres([...filtredData, ...stateNombre]);
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const id = token.id
    const result = await eliminarRestauranteApi(nombre,id)
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
    console.log("Hola?")
  }

  mostrar();
  return (
    <List
      itemLayout="vertical"
      size="small"
      pagination={{
        pageSize: 3,
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
            <IconText
              icon={LikeOutlined}
              text="156"
              key="list-vertical-like-o"
            />,
            <IconText
              icon={MessageOutlined}
              text="2"
              key="list-vertical-message"
            />,
          ]}
          extra={
            <Avatar
              alt="Remy Sharp"
              src={item.photo}
              style={{ height: "100%", width: "250px" }}
            />
          }
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
          <Button
            size="small"
            color="inherit"
            href={`/comensal/menu/${item.nombres}`}
          >
            Ver menú
          </Button>
          <br />
          <br />
          <Button
            size="small"
            color="inherit"
            onClick={() => handleDelete(item.nombres)}
          >
            Eliminar
          </Button>
          <br/>
          <br/>
          <PopOverInfo nombre={item.nombres} color={"primary"} />
        </List.Item>
      )}
    />
  );
};

export default TablaListRestaurantes;
