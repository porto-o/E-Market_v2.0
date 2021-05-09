import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table,} from "reactstrap";
import {deleteMenu, getMenuApi, SaveMenuApi} from "../../api/RestaurantApi";
import jwtDecode from "jwt-decode";
import {ACCESS_TOKEN} from "../../utils/constants";
import AvatarUpload from "../utils/AvatarUpload";

import { notification } from "antd";

const data = [];
let nombreVista;
let descripcionVista;
let precioVista;
let fotoVista;
let tiempoVista;
let arrayNombres = []
let arrayDescripcion = []
let arrayPrecio = [];
let arrayFotos = [];
let arrayTiempos = [];

class TablaMenu extends React.Component {

    cargar = () => {
        window.onload = async () => {
            const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN))
            const result = await getMenuApi(token.id)
            
            if (result.message) {
                notification.error({
                    message: result.message,
                    placement: 'bottomLeft'
                })
            } else {
                result.filter(function (el) {
                    nombreVista = el.nombre
                    descripcionVista = el.descripcion
                    precioVista = el.precio
                    fotoVista = el.dishPhoto
                    tiempoVista = el.tiempoPrep
                    arrayNombres.push(nombreVista)
                    arrayDescripcion.push(descripcionVista)
                    arrayPrecio.push(precioVista)
                    arrayFotos.push(fotoVista)
                    arrayTiempos.push(tiempoVista)
                    return (nombreVista, descripcionVista);
                })
                for (let i = 0; i < arrayNombres.length; i++) {
                    data.push({
                        id: i+1,
                        nomPlatillo: arrayNombres[i],
                        description: arrayDescripcion[i],
                        precio: arrayPrecio[i],
                        foto: arrayFotos[i],
                        tiempo: arrayTiempos[i]
                    });
                }
            }
        }
    }

    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: true,
        form: {
            nomPlatillo: data.nomPlatillo,
            description: data.description,
            precio: data.precio,
            tiempoPrep: data.tiempoPrep,
            dishPhoto: data.dishPhoto
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({modalActualizar: false});
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({modalInsertar: false});
    };

    updateMenuAM = async (_newName, _newDescription, _newPrice, _position) => {

        //const id = token.id;
        //const result = await updateMenu(id, newName, newDescription, newPrice, position);

    }

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            
            if (dato.id === registro.id) {
                arreglo[contador].nomPlatillo = dato.nomPlatillo;
                arreglo[contador].description = dato.description;
                arreglo[contador].precio = dato.precio;
            }
            contador++;
            return null
        });
        this.setState({data: arreglo, modalActualizar: false});
        console.log("Despues de actualizar", arreglo);
        this.updateMenuAM();

    };

    deleteMenuAM = async(dish) => {
        //e.preventDefault();
        const token = jwtDecode(localStorage.getItem(ACCESS_TOKEN));
        const id = token.id;
        const result = await deleteMenu(id, dish);

        if(result.response){
            notification["error"]({
                message: result.message,
                style: { width: 500, marginTop: 50 },
            })
        }else{
            notification["success"]({
                message: result.message,
                style: { width: 500, marginTop: 50 },
            });
        }
    }

    eliminar = (dato) => {
        var opcion = window.confirm("¿Estás seguro que quiere eliminar " + dato.nomPlatillo + "?");
        if (opcion) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
                return null
            });
            this.setState({data: arreglo, modalActualizar: false});
            //ENVIAMOS LOS DATOS AL API
            this.deleteMenuAM(dato.nomPlatillo, dato.id);
        }
    };

    insertar = () => {
        var valorNuevo = {...this.state.form};
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({modalInsertar: false, data: lista});
        this.guardar()
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    guardar = async () => {
        const photoDish = localStorage.getItem("PhotoBlob")
        this.state.form.dishPhoto = photoDish
        await SaveMenuApi(this.state.form);
        window.location = "/restaurante/editmenu"

    }


    render() {
        this.cargar()
        return (
            <>
                <Container>
                    <br/>
                    <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
                    <br/>
                    <br/>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Foto</th>
                            <th>Nombre del platillo</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Tiempo de preparación</th>
                            <th>Acción</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id} style={{textAlign: "center", margin: "auto"}}>
                                <td>{dato.id}</td>
                                <td><img src={dato.foto} alt="Foto platillo" style={{width: "100px"}}></img></td>
                                <td>{dato.nomPlatillo}</td>
                                <td>{dato.description}</td>
                                <td>$ {dato.precio}</td>
                                <td>{dato.tiempo} minutos</td>
                                <td>

                                    <Button
                                        color="primary"

                                    >
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalActualizar} style={{marginTop: "100px"}}>
                    <ModalHeader>
                        <div><h3>Editar Platillos</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Nombre del platillo:
                            </label>
                            <input
                                className="form-control"
                                name="nomPlatillo"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.nomPlatillo}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Breve descripción:
                            </label>
                            <input
                                className="form-control"
                                name="description"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.description}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Precio:
                            </label>
                            <input
                                className="form-control"
                                name="precio"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.precio}
                            />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"

                        >
                            Editar
                        </Button>
                        <Button
                            color="danger"

                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalInsertar} style={{marginTop: "100px"}}>
                    <ModalHeader>
                        <div><h3>Insertar Nombre del platillo</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>
                                Nombre del platillo:
                            </label>
                            <input
                                className="form-control"
                                name="nomPlatillo"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Breve descripción:
                            </label>
                            <input
                                className="form-control"
                                name="description"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Precio:<br/>
                                <p>*El platillo no se guardará si ingresa un precio menor a $ 10 o si ingresa un dato inválido.</p>
                            </label>
                            <input
                                className="form-control"
                                name="precio"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>
                                Tiempo de preparación:
                            </label>
                            <input
                                className="form-control"
                                name="tiempoPrep"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label name="dishPhoto"  onChange={this.handleChange}>
                                Imagen del platillo:
                            </label>
                            <AvatarUpload />
                        </FormGroup>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.insertar()}
                        >
                            Guardar
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => this.cerrarModalInsertar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default TablaMenu;