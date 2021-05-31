import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import Navbar from "../components/Restaurant/NavbarRest";
import useAuth from "../hooks/useAuth";
import SignInRest from "../components/FormRest/SignInFormRestaurant";
import {ACCESS_TOKEN} from "../utils/constants";
import jwtDecode from "jwt-decode";
import FooterE from "./FooterE";


const LayoutRest = (props) => {

    const {Content, Footer} = Layout;
    const {routes} = props;
    const {user, isLoading} = useAuth();

    if(!localStorage.getItem("accessToken") || !localStorage.getItem("refreshToken")){
        window.location = "/signin"
    }else {
        const access = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
        if (access.role !== "restaurante") {
            return (
                <>
                    <Route path="/comensal"/>
                    <Redirect to="/comensal"/>
                </>
            )
        }
    }
    if (!user && !isLoading) {
        return (
            <>
                <Route path="/signin" component={SignInRest}/>
                <Redirect to="/signin"/>
            </>
        )
    }


    return (
        <>
            <Navbar/>
            <Content style={{padding: "50px 80px"}}>
                <LoadRoutes routes={routes} className="site-layout-content"/>
            </Content>
            <Footer><FooterE/></Footer>
        </>
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

export default LayoutRest;