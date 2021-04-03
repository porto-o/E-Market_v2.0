import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../../utils/constants";
import {notification} from "antd";
import {AddRestaurantApi} from "../../../api/ComensalApi";

const BtnAgregarRest = () => {
    const [open, setOpen] = useState(false);

    const [inputs, setInputs] = useState({
        pin: "",
    });

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async (e) => {

        e.preventDefault();
        const pin = JSON.stringify(inputs);
        const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const id = token.id
        const result = await AddRestaurantApi(id, pin);
        if (result.message) {
            notification["warning"]({
                message: result.message,
                style: {width: 500, marginTop: 50},
            });
            setOpen(false);
        } else {
            notification["success"]({
                message: "Restaurante agregado satisfactoriamente!",
                style: {width: 500, marginTop: 50},
            });
            setOpen(false);
            window.location.reload(true)
        }
    }



    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Agregar restaurante
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Restaurante</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingresa el 'id' (identificador) del restaurante.
                    </DialogContentText>
                    <TextField
                        onChange={changeForm}
                        autoFocus
                        required
                        name="pin"
                        margin="dense"
                        id="pin"
                        label="Id del restaurante"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={handleSave} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BtnAgregarRest;