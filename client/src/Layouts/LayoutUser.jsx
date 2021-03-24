import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import Navbar from "../components/Comensal/NavbarComensal";
import SignInComensal from "../components/FormComensal/SignInFormComensal";
import useAuth from "../hooks/useAuth";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../utils/constants";
import jwtDecode from "jwt-decode";

const LayoutUser = (props) => {
    const {Content, Footer} = Layout;
    const {routes} = props;
    const {user, isLoading} = useAuth();

    if(!localStorage.getItem(ACCESS_TOKEN) || !localStorage.getItem(REFRESH_TOKEN)){
        window.location = "/signin"
    }else {
        const access = jwtDecode(localStorage.getItem(ACCESS_TOKEN))

        if (access.role !== "comensal") {
            return (
                <>
                    <Route path="/restaurante"/>
                    <Redirect to="/restaurante"/>
                </>
            )
        }
    }
    if (!user && !isLoading) {
        return (
            <>
                <Route path="/signin" component={SignInComensal}/>
                <Redirect to="/signin"/>
            </>
        );
    }

    const datos = JSON.stringify(user);
    console.log(datos)
    const datos2 = datos.split(",");
    console.log(datos2[1]);
    return (
        <div>
            <Navbar/>
            <Content style={{padding: "50px 80px"}}>
                <LoadRoutes routes={routes} className="site-layout-content"/>
            </Content>
            <Footer style={{textAlign: "center"}}>E-Market 2020 Olimpo</Footer>
        </div>
    );

};

function LoadRoutes({routes}) {
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

export default LayoutUser;