import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import {notification, Transfer} from 'antd';
import {useParams} from "react-router-dom"
import {getMenuApi, ordenarApi} from "../../api/ComensalApi";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CircularProgress, IconButton} from "@material-ui/core";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";

const mockData = [];

let nombreVista;
let descripcionVista;
let precioVista;
let arrayNombres = []
let arrayDescripcion = []
let arrayPrecio = []
let nombrePedido
var arrayOrden = []




//const initialTargetKeys = mockData.filter(item => +item.title > 10).map(item => item.title);

const Menu = () => {
    const {nombres} = useParams();
    const token = (localStorage.getItem(ACCESS_TOKEN))

    const [targetKeys, setTargetKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);


    const onChange = (nextTargetKeys) => {
        for (let i = 0; i < nextTargetKeys.length; i++) {
            const indice = nextTargetKeys[i]
            nombrePedido = mockData[indice].title
            arrayOrden.push(nombrePedido)

        }
        setTargetKeys(nextTargetKeys);
    };


    const ordenar = async () => {
        const token = jwtDecode(localStorage.getItem("accessToken"));
        if (arrayOrden == "" || arrayOrden === null || !arrayOrden) {
            notification.info({
                message: "Porfavor selecciona un platillo.",
                placement: 'bottomLeft',
            })
        } else {
            const id = token.id
            // eslint-disable-next-line
           await ordenarApi(arrayOrden,nombres,id)
            while (arrayOrden.length > 0) {
                arrayOrden.pop();
            }
            window.location = `/comensal/status/${token}/${nombres}`

        }
    }

    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const Llenar = async () => {
        const {nombres} = useParams();
        console.log(nombres)
        window.onload = async () => {
            const result = await getMenuApi(nombres)
            if (result.message) {
                notification.info({
                    message: result.message,
                    placement: 'bottomLeft'
                })

            } else {

                result.filter(function (el) {
                    nombreVista = el.nombre
                    descripcionVista = el.descripcion
                    precioVista = el.precio
                    arrayNombres.push(nombreVista)
                    arrayDescripcion.push(descripcionVista)
                    arrayPrecio.push(precioVista)
                    return (nombreVista, descripcionVista);
                })

                for (let i = 0; i < arrayNombres.length; i++) {
                    mockData.push({
                        key: i.toString(),
                        title: arrayNombres[i],
                        description: arrayDescripcion[i],
                        price: arrayPrecio[i]
                    });
                }

            }

        }
    }

    Llenar()
    return (
        <div id="menu" align={"center"}>
            <Transfer
                dataSource={mockData}
                titles={[`Menú de ${nombres}`, 'Mi orden']}
                targetKeys={targetKeys}
                listStyle={{
                    width: 800,
                    height: 300,

                }}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                render={item => `${item.title}: ${item.description}.......$ ${item.price}`}

            />
            <IconButton id="btnOrdenar"  color="primary" aria-label="add to shopping cart" onClick={ordenar}>
                <AddShoppingCartIcon/> Ordenar
            </IconButton>
        </div>

    );
};


export default Menu