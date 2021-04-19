import React from "react";
import FacebookLogin from "react-facebook-login";
import { SignInApi } from "../../api/ComensalApi";
import { notification } from "antd";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";



const responseFacebook = async (response) => {
    if (response.name !== undefined) {
      const values = {
        userName: response.name,
        password: "9AKj9GocPc58Uqlcew4&ciTQLU*bIieSz&@s9OMELZ*3WPdd"
      }

      const result = await SignInApi(values);

    if (result.message) {
      notification["error"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({
        message: "Bienvenido",
        style: { width: 500, marginTop: 50 },
      });
      window.location.href = "/comensal";
    }
    }
  };

const FacebookSignIn = () => {
  return (
    <FacebookLogin
      appId="1405483906467147"
      textButton="Iniciar sesión con Facebook"
      icon="fa-facebook"
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};

export default FacebookSignIn
