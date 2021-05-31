import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "../components/home/Navbar";
import { ACCESS_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";
import Zoom from "@material-ui/core/Zoom";
import FooterE from "./FooterE";

const LayoutHome = (props) => {
  const { Content, Footer } = Layout;
  const { routes } = props;
  const [checked] = React.useState(true);

  if (localStorage.getItem(ACCESS_TOKEN)) {
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));

    if (token.role === "comensal") {
      window.location = "/comensal";
    } else if (token.role === "restaurante") {
      window.location = "/restaurante";
    } else {
      window.location = "/";
    }
  }

  return (
    <div>
      <Navbar />
      <Zoom in={checked} style={{ transitionDelay: checked ? "500ms" : "0ms" }}>
        <Content style={{ padding: "50px 80px" }}>
          <LoadRoutes routes={routes} className="site-layout-content" />
        </Content>
      </Zoom>
      <Footer>
        <FooterE></FooterE>
      </Footer>
    </div>
  );
};

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

export default LayoutHome;
