import React from "react";
import {Carousel} from "antd";

const contentStyle = {
    height: '420px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
  };



  const Carrousel = () => {
      return(
        <Carousel autoplay>
        <div>
          <h3 style={contentStyle}><img src="https://image.freepik.com/foto-gratis/retrato-sorprendida-dama-rubia-pelo-largo-sombrero-ancho-marron-camisa-blanca-sentada-restaurante-almuerzo-bebiendo-batido-revisando-redes-sociales-su-telefono-movil_295783-5234.jpg" alt="img"/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://image.freepik.com/vector-gratis/familia-protegida-virus_52683-38997.jpg" alt="img"/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://image.freepik.com/vector-gratis/comida-sana-cuencos-diferentes-colores_23-2148497248.jpg" alt="img"/></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://image.freepik.com/vector-gratis/prevenir-ilustracion-concepto-rebote-epidemico_114360-3008.jpg" alt="img"/></h3>
        </div>
      </Carousel>
      );
  };

  export default Carrousel