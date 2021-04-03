import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "420px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
};

const Carrousel2 = () => {
  return (
    <Carousel autoplay>
      <div>
        <h3 style={contentStyle}>
          <img
            src="https://image.freepik.com/vector-gratis/gente-diminuta-recibiendo-hoja-papel-ilustracion-plana-fina_74855-11107.jpg"
            alt="img"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            src="https://image.freepik.com/foto-gratis/camarero-apuntando-mascara-medica-camisa-chaleco-vista-frontal-mascara_176474-14657.jpg"
            alt="img"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            src="https://image.freepik.com/vector-gratis/ilustracion-concepto-comiendo-comida-saludable_114360-2235.jpg"
            alt="img"
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            src="https://image.freepik.com/vector-gratis/retrato-familiar_52683-4758.jpg"
            alt="img"
          />
        </h3>
      </div>
    </Carousel>
  );
};

export default Carrousel2;
