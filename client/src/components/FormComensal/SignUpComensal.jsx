import React from "react";
import { Form, Input, Tooltip, Checkbox, Button, notification } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { signUpApi } from "../../api/ComensalApi";

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

const RegistrationFormComensal = () => {
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
    window.location = "/signin";
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
        label={
          <span>
            Nombre de usuario&nbsp;
            <Tooltip title="¿Con que nombre quieres inicar sesión?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "!Porfavor ingresa un nombre de usuario",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "!El e-mail ingresado no es válido!",
          },
          {
            required: true,
            message: "Porfavor ingresa un e-mail!",
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
            message: "Porfavor ingresa una contraseña!",
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
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Debes aceptar las políticas"),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          He leído y acepto las{" "}
          <a href={"/politicas"}>Políticas de términos y condiciones de uso</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Vamos!
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationFormComensal;
