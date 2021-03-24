import React from "react";
import { Form, Input, Checkbox, Button, notification } from "antd";
import {signUpApi} from "../../api/RestaurantApi";
//import DragAndDrop from "./DragAndDrop";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

const RegistrationFormRestaurant = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
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
    window.location = "/signin"
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="Nombre del Restaurante"
        rules={[
          {
            required: true,
            message: "Porfavor ingresa el nombre del restaurante!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Contraseña"
        rules={[
          {
            required: true,
            message: "Porfavor ingresa una contraseña",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirmar contraseña"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Porfavor confirma tu contraseña!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Las contraseñas no coinciden!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Nombre del representante"
        rules={[
          {
            required: true,
            message: "Porfavor ingresa un nombre de representante!",
          },
        ]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>



      <Form.Item
        name="presentationRes"
        label="Carta de presentación"
        rules={[
          {
            required: true,
            message: "Porfavor escribe tu carta de presentación!",
          },
        ]}
      >
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Debes de aceptar los términos y condiciones"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Acepto los <a href={"/politicas"}>Términos y Condiciones de Uso</a>
        </Checkbox>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Registrarse
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationFormRestaurant;
