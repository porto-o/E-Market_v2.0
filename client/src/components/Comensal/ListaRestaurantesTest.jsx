import React, { useState } from "react";
import { Avatar, Button, List, notification, Space } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import { getInfoResApi, getRestaurantApi } from "../../api/ComensalApi";
import PopOverInfo from "../Restaurant/PopOverInfo";

const listData = [];

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ListaRestaurantesTest = () => {
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
              nombres: result2.nombre,
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
  console.log(stateNombre);
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
          extra={<img width={150} alt="logo" src={item.photo} />}
        >
          <List.Item.Meta
            avatar={
              <Avatar src="https://www.flaticon.com/svg/vstatic/svg/2921/2921822.svg?token=exp=1617860342~hmac=11b28e9fe4fb75d686290f069b8af2ef" />
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
          <PopOverInfo content={item.nombres} />
        </List.Item>
      )}
    />
  );
};

export default ListaRestaurantesTest;
