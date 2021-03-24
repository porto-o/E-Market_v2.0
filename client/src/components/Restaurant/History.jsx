import React, {useState} from "react"
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {notification} from "antd";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";
import {getHistorialApi} from "../../api/RestaurantApi";


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

const History = () => {

    const classes = useStyles();
    const [stateOrdenes, setOrdenes] = useState([]);
    var platilloNombres;
    var idOrden;
    var total;
    var fecha;
    var ganancias = 0;
    var arrayFinal = []
    const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
    const nombreRes = token.userName



    const llenar = () => {
        window.onload = async (e) => {
            e.preventDefault()
            const result = await getHistorialApi(nombreRes)
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
                     ganancias += parseFloat(total[i]);
                    console.log(ganancias)
                    arrayFinal.push(objetoOrden)
                }
                setOrdenes([...arrayFinal, ...stateOrdenes])
                document.getElementById("ganancias").innerText = "$ "+ganancias

            }
        }
    }

llenar()
    return(
        <div className={classes.root} >
            <Typography variant="h4">
                Historial de Ordenes
            </Typography>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Número de Orden</b></TableCell>
                            <TableCell align="right"><b>Platillos</b></TableCell>
                            <TableCell align="right"><b>Total</b></TableCell>
                            <TableCell align="right"><b>Fecha</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            stateOrdenes.map((item) => (
                                <TableRow className={classes.row}>
                                    <TableCell component="th" scope="row">{item.id.slice(0,8)}</TableCell>
                                    <TableCell align="right">{item.nombre}</TableCell>
                                    <TableCell align="right">{item.total}</TableCell>
                                    <TableCell align="right">{item.fecha.slice(0,10)}</TableCell>
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
            <Grid>
                <label><Typography variant="h5">Ganancias totales</Typography></label>
                <br></br>

                <Box component="span" >
                    <Typography variant="h4" id={"ganancias"}>
                    </Typography>
                </Box>
            </Grid>
        </div>

    )
}

export default History