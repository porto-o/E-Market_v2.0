import React, { useRef, useEffect, useState } from "react";
import ReactDOM from 'react-dom'

const CuentaRegresiva = () => {

    const startingMinutes = 10;
    let time = startingMinutes *60;

    setInterval(updateCountDown, 1000);
    function updateCountDown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        const element = `${minutes}:${seconds}`
        time--;
        ReactDOM.render(element, document.getElementById("contador"))
    }
    
    return(
        <div id="contador">
            
        </div>
    )
};

export default CuentaRegresiva;
