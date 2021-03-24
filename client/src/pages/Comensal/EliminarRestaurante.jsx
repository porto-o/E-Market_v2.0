import React from "react"
import {useParams} from "react-router-dom";

const ElminarRest = () => {
    const { nombre, id } = useParams();

    console.log(nombre, id)

    window.onload = async () => {
        console.log("1")
        //const result = await eliminarRestauranteApi(nombre, id)

    }



    return(
        <>
        Estamos actualizando la Base de Datos... Espera un momento por favor.
        </>
    )
}

export default ElminarRest