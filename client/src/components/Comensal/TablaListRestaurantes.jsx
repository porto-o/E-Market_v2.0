import React, { useState } from "react";
import { Button, List, notification, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import { getRestaurantApi } from "../../api/ComensalApi";
import { getInfoResApi } from "../../api/RestaurantApi";
import PopOverInfo from "../Restaurant/PopOverInfo";
import Avatar from "@material-ui/core/Avatar";

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
            "Aún no hay restaurantes registrados en tu lista, añade uno en la parte derecha de tu pantalla.",
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
  mostrar();
  return (
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
          extra={<Avatar alt="Remy Sharp" src={item.photo} style={{height: "100%", width: "250px"}}/>}
        >
          <List.Item.Meta
            avatar={
              <img alt="" src="https://img.icons8.com/metro/26/000000/restaurant.png"/>
            }
            title={<b>Restaurante: {item.nombres}</b>}
            description={item.description}
          />
          <Button
            size="small"
            color="primary"
            href={`/comensal/menu/${item.nombres}`}
          >
            Ver menú
          </Button>
          <PopOverInfo nombre={item.nombres} color={"primary"}/>
        </List.Item>
      )}
    />
  );
};

export default TablaListRestaurantes;
