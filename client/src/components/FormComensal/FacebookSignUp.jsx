import React from "react";
import FacebookLogin from "react-facebook-login";
import { signUpApi } from "../../api/ComensalApi";
import { notification } from 'antd'

const responseFacebook = async (response) => {
  if (response.name !== undefined) {
    const values = {
      userName: response.name,
      email: response.email,
      photo: response.picture.data.url,
      password: "9AKj9GocPc58Uqlcew4&ciTQLU*bIieSz&@s9OMELZ*3WPdd"
    }

    
    const result = await signUpApi(values);
    if (result.ok === false) {
      notification["error"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    } else {
      notification["success"]({
        message: result.message,
        style: { width: 500, marginTop: 50 },
      });
    }
    window.location = "/signin";

  }
};

const FacebookLoginComp = () => {
  return (
    <FacebookLogin
      appId="1405483906467147"
      textButton="Registrarse con Facebook"
      icon="fa-facebook"
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginComp;
