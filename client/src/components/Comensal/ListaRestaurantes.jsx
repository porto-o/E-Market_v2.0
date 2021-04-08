import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../../utils/constants";
import {getRestaurantApi} from "../../api/ComensalApi";
import Button from "@material-ui/core/Button";
import { notification } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "../../pages/Comensal/Menu";
import EliminarRest from "../../pages/Comensal/EliminarRestaurante";
import PopOverInfo from "../Restaurant/PopOverInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    alignContent: 20,
  },
}));

export default function ListaRestaurantes(props) {

  const classes = useStyles();
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
      {stateNombre.map((item) => (
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <MenuBookIcon />
            </ListItemAvatar>
            <PopOverInfo content={item}/>
            <Button
              size="small"
              color="primary"
              className={classes.button}
              href={`/comensal/menu/${item}`}
            >
              Ver menú
            </Button>
          </ListItem>
        </List>
      ))}
      <Switch>
        <Route path="/comensal/menu/:nombres" exact={true} component={Menus} />
        <Route
          path="/comensal/menu/elminar/:nombre/:id"
          exact={true}
          component={Eliminar}
        />
      </Switch>
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
