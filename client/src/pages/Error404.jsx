import React from "react";
import { Result } from 'antd';

const Error404 = () => {
    return(
        <Result
            status="404"
            title="404"
            subTitle="Lo sentimos, la página que estàs buscando no existe."
        />
    )
}

export default Error404