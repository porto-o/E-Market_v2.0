//importando los layours de los diferentes usuarios
import LayoutHome from "../Layouts/LayoutHome";
import LayoutUser from "../Layouts/LayoutUser";
import LayoutRest from "../Layouts/LayoutRest";

//importando las páginas
//inicio

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import HomeComensal from "../pages/Comensal/HomeComensal";
import Menu from "../pages/Comensal/Menu";
import Pay from "../pages/Comensal/Pay";
import PaymentMethods from "../pages/Comensal/PaymentMethods";
import Profile from "../pages/Comensal/Profile";
import Status from "../pages/Comensal/Status";
import Tickets from "../pages/Comensal/Tickets";
import HomeRest from "../pages/Restaurante/HomeRest";
import EditMenu from "../pages/Restaurante/EditMenu";
import ProfileRest from "../pages/Restaurante/Profile";
import RecordOrders from "../pages/Restaurante/RecordOrders";
import Error404 from "../pages/Error404";
import EliminarRestaurante from "../pages/Comensal/EliminarRestaurante"
import Success from "../pages/Comensal/successPay";
import Politicas from "../components/Politicas";
import TableHistory from "../components/Restaurant/TableHistory";
//comensal

const routes = [

  {
    path: "/comensal",
    component: LayoutUser,
    exact: false,
    routes: [
      {
        path: "/comensal",
        component: HomeComensal,
        exact: true,
      },
      {
        path: "/comensal/tickets",
        component: Tickets,
        exact: true,
      },
      {
        path: "/comensal/menu/:nombres",
        component: Menu,
        exact: true,
      },
      {
        path: "/comensal/menu/eliminar/:nombre/:id",
        component: EliminarRestaurante,
        exact: true,
      },
      {
        path: "/comensal/status/:token/:nombreRes",
        component: Status,
        exact: true,
      },
      {
        path: "/comensal/pay",
        component: Pay,
        exact: true,
      },
      {
        path: "/comensal/profile",
        component: Profile,
        exact: true,
      },
      {
        path: "/comensal/paymentMethods",
        component: PaymentMethods,
        exact: true,
      },

      {
        path: "/comensal/success",
        component: Success,
        exact: true,
      },
      {
        component: Error404
      }
    ],
  },
  {
    path: "/restaurante",
    component: LayoutRest,
    exact: false,
    routes: [
      {
        path: "/restaurante",
        component: HomeRest,
        exact: true,
      },
     
      {
        path: "/restaurante/profile",
        component: ProfileRest,
        exact: true,
      },
      {
        path: "/restaurante/editMenu",
        component: EditMenu,
        exact: true,
      },
      {
        path: "/restaurante/record",
        component: RecordOrders,
        exact: true,
      },
      {
        path: "/restaurante/history",
        component: TableHistory,
        exact: true
      },
      {
        component: Error404
      }
    ],
  },
  {
    path: "/",
    component: LayoutHome,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/signin",
        component: SignIn,
        exact: true,
      },
      {
        path: "/signup",
        component: SignUp,
        exact: true,
      },
      {
        path: "/politicas",
        component: Politicas,
        exact: true
      },
      {
        component: Error404
      }
    ],
  },

];

export default routes;
