import React from 'react';
import {useParams} from "react-router-dom";
import ReactDOM from 'react-dom'
import {notification, Table} from "antd"
import es_ES from 'antd/lib/locale/es_ES';
import {ConfigProvider} from "antd/es";
import {getHistorialApi} from "../../api/RestaurantApi";
import {CircularProgress} from "@material-ui/core";

// CONSTANTES
var ganancias = 0;
var arrayFinal = []

const columns = [
    {
        title: 'ID de la orden',
        dataIndex: 'id',
    },
    {
        title: 'Platillos',
        dataIndex: 'dish',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.total - b.total,
    },
    {
        title: 'Día',
        dataIndex: 'day',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.day - b.day,
    },

    {
        title: 'Mes',
        dataIndex: 'month',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.month - b.month,
    },

    {
        title: 'Año',
        dataIndex: 'year',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.year - b.year,
    },
];

const data = [];
const llenado = async (nombreRes) => {
    var dish, id, total,day, month, year;
    const result = await getHistorialApi(nombreRes)
    if(result.message) {
        notification.info({
            message: result.message,
            placement: 'bottomLeft'
        })
    }else {
        result.filter(function (el) {
            dish = el.platillos
            total = el.total
            id = el.idOrden
            year = el.fecha
            return (dish, total);
        })

        for (let i = 0; i < dish.length; i++) {
            data.push({
                "key": `${i + 1}`,
                "id": id[i],
                "dish": dish[i],
                "total": total[i],
                "day": year[i].slice(8, 10),
                "month": year[i].slice(5, 7),
                "year": year[i].slice(0, 4)
            })
        }
        console.log(data)
        
    }
    const element = <ConfigProvider locale={es_ES}>
            <Table columns={columns} dataSource={data}/>
        </ConfigProvider>
    ReactDOM.render(element, document.getElementById('hola'))

}
//llenado()
const TableHistory = () => {
    const {nombreRes} = useParams();
    llenado(nombreRes)
    return (
        <div id="hola" align={"center"}>
            <CircularProgress/>
        </div>
    )
}

export default TableHistory