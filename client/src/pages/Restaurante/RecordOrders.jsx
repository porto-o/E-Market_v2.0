import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";
import {getOrdenesApi, setStatusApi} from "../../api/RestaurantApi";
import {notification} from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Select } from 'antd';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const { Option } = Select;


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    header: {
        padding: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary,
    },
    row: {
        maxWidth: 100
    }
}));

const useStyles2 = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default function RecordOrders () {
    const classes = useStyles();
    const classes2 = useStyles2();
    const [stateOrdenes, setOrdenes] = useState([]);
    var platilloNombres;
    var idOrden;
    var total;
    var arrayFinal = []
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const nombreRes = token.userName



    const llenar = () => {
        window.onload = async (e) => {
            e.preventDefault()
            const result = await getOrdenesApi(nombreRes)
            console.log(result)


            if (result.message) {
                notification.info({
                    message: result.message,
                    placement: 'bottomLeft'
                })
            } else {
                result.filter(function (el) {
                    console.log(el)
                    platilloNombres = el.platillos
                    total = el.total
                    idOrden = el.idOrden
                    return (platilloNombres, total);
                })

                for (let i = 0; i < platilloNombres.length; i++){
                    var objetoOrden = {
                        "id": idOrden[i],
                        "nombre": platilloNombres[i],
                        "total": total[i]
                    };
                    arrayFinal.push(objetoOrden)
                }


                setOrdenes([...arrayFinal, ...stateOrdenes])

            }
        }
    }


    async function handleChange(value, id)  {

        const result = await setStatusApi(value, id.id);
        if(result.message){
            notification.warning({
                message: result.message,
                placement: 'bottomLeft'
            })

        }else{
            notification.success({
                message: "El estatus se ha actualizado correctamente",
                placement: 'bottomLeft'
            })
        }
    }


    llenar()
    return(
        <div className={classes.root} >
            <Typography variant="h4">
                Ordenes en progreso
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Número de Orden</b></TableCell>
                            <TableCell align="right"><b>Platillo</b></TableCell>
                            <TableCell align="right"><b>Total</b></TableCell>
                            <TableCell align="right"><b>Estatus</b></TableCell>
                            <TableCell align="right"><b>Funciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            stateOrdenes.map((item) => (
                            //platillos
                            <TableRow className={classes.row}>
                                <TableCell component="th" scope="row" >{item.id}</TableCell>
                                <input type={"text"} id="idOrder" value={item.id} hidden></input>
                                <TableCell align="right">{item.nombre}</TableCell>
                                <TableCell align="right">{item.total}</TableCell>
                                <TableCell align="right">
                                    <Select defaultValue="0" style={{ width: 120 }} onChange={handleChange}>
                                        <Option value={"0"} id={item.id}>Recibido en Cocina</Option>
                                        <Option value="1" id={item.id}>Cocinando</Option>
                                        <Option value="2" id={item.id}>Entregada</Option>
                                    </Select>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes2.button}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Cancelar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
            <Grid>
                <label><Typography variant="h5">Número de Ordenes</Typography></label>
                <br></br>
                <Box component="span" >
                    <Typography variant="h4">
                        {stateOrdenes.length}
                    </Typography>
                </Box>
            </Grid>
        </div>

    )
}

