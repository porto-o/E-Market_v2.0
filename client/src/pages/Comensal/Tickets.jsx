import React, {useState} from "react";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";
import {getTicketsApi} from "../../api/ComensalApi";
import {notification} from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

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

export default function Tickets(){

    const classes = useStyles();
    const classes2 = useStyles2();
    const [stateOrdenes, setOrdenes] = useState([]);
    var platilloNombres;
    var idOrden;
    var total;
    var fecha;
    var arrayFinal = []
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const nombreCom = token.userName

    const llenar = () => {
        window.onload = async (e) => {
            e.preventDefault()
            const result = await getTicketsApi(nombreCom);
            console.log(result);


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
                    fecha = el.fecha
                    return (platilloNombres, total);
                })

                for (let i = 0; i < platilloNombres.length; i++){
                    var objetoOrden = {
                        "id": idOrden[i],
                        "nombre": platilloNombres[i],
                        "total": total[i],
                        "fecha": fecha[i]
                    };
                    arrayFinal.push(objetoOrden)
                }

                setOrdenes([...arrayFinal, ...stateOrdenes])

            }
        }
    }

    llenar()
    return(
        <div className={classes.root} >
            <Typography variant="h4">
                Mis pedidos
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Número de Orden</b></TableCell>
                            <TableCell align="right"><b>Platillo</b></TableCell>
                            <TableCell align="right"><b>Total</b></TableCell>
                            <TableCell align= "right"><b>Fecha</b></TableCell>
                            <TableCell align="right"><b>Funciones</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {
                            stateOrdenes.map((item) => (
                                //platillos
                                <TableRow className={classes.row}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="right">{item.nombre}</TableCell>
                                    <TableCell align="right">{item.total}</TableCell>
                                    <TableCell align="right">{item.fecha.slice(0,10)}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes2.button}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
        </div>

    )

}
//TICKETS VIEJITO

/*
const classes = new useStyles();
    return(
        <div className={classes.root} >

                <Typography variant="h4">
                    Mis Tickets
                </Typography>

                <Grid item xs={12} spacing={8} justify="space-between" >
                    <form className={classes.container} noValidate>
                            <TextField
                            id="date"
                            label="Desde:"
                            type="date"
                            defaultValue="2020-12-04"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
                        <TextField
                            id="date"
                            label="Hasta:"
                            type="date"
                            defaultValue="2020-12-04"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                </Grid>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="caption table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Número de Pedido</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Estatus</TableCell>
                            <TableCell align="right">Archivo</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                            <TableCell align="right">{row.estatus}</TableCell>
                            <TableCell align="right">{row.archivo}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br></br>
                <br></br>
                <br></br>
                <Grid>
                   <Typography variant="h5">
                        Total de Gastos: &nbsp;$ ######.##
                   </Typography>
                </Grid>
        </div>
    );
*/