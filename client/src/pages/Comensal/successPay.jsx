import React from "react"
import {notification, Result} from 'antd';
import { Form,Button} from 'antd';
import {verificarFirma} from "../../api/ComensalApi";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Success = () => {
    return(
        <>
    <Result
        status="success"
        title="Pago realizado exitósamente"
        subTitle="Gracias por usar E-Market"
        extra={[
            <Button type="primary" key="console" href={"/comensal"}>
                Menú principal
            </Button>
        ]}
    />
    <Demo/>

    </>

    )
}

const Demo = () => {
    const onFinish = async (values) => {
        console.log(values.firma);
        const firma = {
            "firma": values.firma
        }
        const result = await verificarFirma(firma.firma)
        if(result.message){
            notification.info({
                message: result.message,
                placement: "bottomLeft"
            })
        }else{
            notification.info({
                message: "La firma para el ticket generado es válida.",
                placement: "bottomLeft"
            })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Error:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Verificar firma
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Success