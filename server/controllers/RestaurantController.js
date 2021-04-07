const bcrypt = require("bcrypt-nodejs");
const Restaurante = require("../models/RestauranteModel");
const jwt = require("../services/jwt");
const MenuModel = require("../models/MenuModel");
const OrdersModel = require ("../models/OrdenesModel");
const VentasModel = require("../models/VentasModel")

const SignUp = (req, res) => {
    console.log("req.body en el restaurantController.js servidor ", req.body);
    const user = new Restaurante();
    const {userName, password, phone, photoRes, presentationRes} = req.body;
    user.userName = userName;
    user.password = password;
    user.contactNumber = phone;
    user.photo = photoRes;
    user.presentation = presentationRes;
    user.role = "restaurante";
    user.codeRes = random()

    if (!password) {
        res.status(404).send({message: "Los datos son obligatorias."});
    } else {
        bcrypt.hash(password, null, null, function (err, hash) {
            if (err) {
                res.status(500).send({message: "Error al encriptar la contraseña."});
            } else {
                user.password = hash;

                user.save((err, userStored) => {
                    if (err) {
                        res
                            .status(500)
                            .send({message: "El nombre de usuario ya existe."});
                        console.log(err)
                    } else {
                        if (!userStored) {
                            res.status(404).send({message: "Error al crear el usuario."});
                        } else {
                            res.status(200).send({user: userStored});
                        }
                    }
                });
            }
        });
    }
};

const SignIn = (req, res) => {
    const params = req.body;
    const userName = params.userName;
    const password = params.password;

    Restaurante.findOne({userName}, (err, userStored) => {
        if (err) {
            res.status(500).send({message: "Error del servidor."});
        } else {
            if (!userStored) {
                res.status(404).send({message: "Usuario no encontrado."});
            } else {
                bcrypt.compare(password, userStored.password, (err, check) => {
                    if (err) {
                        res.status(500).send({message: "Error del servidor."});
                    } else if (!check) {
                        res.status(404).send({message: "La contraseña es incorrecta :c."});
                    } else {
                        res.status(200).send({
                            accessToken: jwt.createAccessToken(userStored),
                            refreshToken: jwt.createRefreshToken(userStored)
                        });
                    }
                });
            }
        }
    });
};

const getCode = (req, res) => {
    const params = req.params;
    const code = random();
    console.log(params)
    Restaurante.findById({_id: params.id}, (err, userData) => {
        if (err) {
            res.status(500).send({message: "Error del servidor."});
            console.log(err)
        } else {
            if (!userData) {
                res.status(404).send({message: "No sabemos quien eres."});
            } else {
                const code = userData.codeRes
                res.status(200).send({code})
            }
        }
    })
};

const getPresentacion = (req,res) => {
    const params = req.params
    const id = params.id

    Restaurante.findById(id,(err,resPres) => {
        if(err){
            console.log(err)
        }else{
            if(!resPres){
                //console.log("No tiene presentacion")
                res.status(200)
            }else{
                const pres = resPres.presentation
                console.log(pres)
                res.status(200).send({pres})
            }
        }
    })
}

//MENU

const saveMenu = (req, res) => {
    const params = req.body;
    const {nombre, descripcion, precio, id} = params;
    const ventas = "0";
    const obj = {nombre: nombre, precio: precio, descripcion: descripcion, ventas: ventas}
    const menu = MenuModel();
//precios no menores a 10 pesos
    if (!nombre || !precio || !descripcion) {
        res.status(500).send({message: "Los datos son obligatorios c:"});
    } else {
        MenuModel.findOne({Restaurante: id}, (err, resData) => {
            if(err){
                res.status(500).send({message: "Error 500 1"})
                console.log(err);
            }else{
                if(!resData){
                    console.log("no existe todavía un menu registrado");
                    //agregar el restaurante con su primer platillo
                    menu.Restaurante = id;
                    menu.Menu = req.body;
                    menu.save((erro, resSave) => {
                        if(erro){
                            console.log("Error al guardar por primera vez", erro);
                        }else{
                            const fmenu = resSave.Menu;
                            res.status(200).send({message: "Menu: " + resSave.Menu});
                        }
                    });
                }else{
                    MenuModel.findOneAndUpdate({Restaurante: id}, {$addToSet: {Menu: obj}}, (error1, resMMFOAU) => {
                        if(error1){
                            res.status(500).send({message: "Error 500 1"})
                            console.log(error1);
                        }else{
                            if(!resMMFOAU){
                                console.log("Error menú no encontrado");
                            }else{
                                console.log("Platillo guardado", resMMFOAU);
                                MenuModel.findOne({Restaurante: id}, 'Menu', (err, resFinal) => {
                                    res.status(200).send(resFinal.Menu);
                                })
                            }
                        }
                    });
                }
            }
        });
    }
}

const getMenu = (req,res) => {
    const params = req.params
    const id = params.id

    MenuModel.findOne({Restaurante: id}, (err, menuData) => {
        if(err){
            console.log(err)
            res.status(404).send({message: "Error en el servidor."})
        }else{
            if(!menuData){
                res.status(404).send({message: "Aún no tienes un menú registrado."})
            }else{
                res.status(200).send(menuData.Menu)
            }
        }
    })
}

const updateMenu = (req, res) => {
    const params = req.params;
    const idRestaurante  = params.id;
    //const idDish = params.dishid;
    const dishName = params.dish;
    const dishPosition = params.pos;
    const newDishName = params.name;
    const newDishDescription = params.description;
    const newDishPrice = params.price;
    const dishObject = {nombre: newDishName, descripcion: newDishDescription, precio: newDishPrice}
    MenuModel.findOneAndUpdate({$and: [ {"Restaurante": idRestaurante}, {"Menu.nombre": dishName} ]}, {$set: {"Menu.$": dishObject}}, (error, resMMFOAU) =>{
        if (error) {
            console.log("Error al actualizar el platillo", error);
        } else {
            if (!resMMFOAU) {
                console.log("No se actualizr el platillo");
            } else {
                console.log("Paltillo actualizado", resMMFOAU);
            }
        }
    });
}

const deleteMenu = (req, res) => {
    const params = req.params;
    const idRestaurante  = params.id;
    const dishName = params.dish;
    const dishPosition = params.pos;
    MenuModel.findOne({$and: [ {"Restaurante": idRestaurante}, {"Menu.nombre": dishName} ]}, (error, resMMFO) =>{
        if (error) {
            console.log("Error al buscar el platillo error", error)
        } else {
            if (!resMMFO) {
                console.log("No se encontro el platillo")
            } else {
                const menuDish = resMMFO.Menu[dishPosition];
                MenuModel.updateOne({"Restaurante": idRestaurante}, {$pull: {Menu: menuDish}},(error1, resMMFOAU) => {
                    if (error) {
                       console.log("Error al encontar el platillo", error1);
                   } else {
                       if (!resMMFOAU) {
                           console.log("No se encontro el platillo");
                       } else {
                           console.log("Paltillo removido", resMMFOAU);
                       }
                   }
                });
            }
        }
    });
}

function random() {
    return Math.floor(Math.random() * 1000000000);

}

//Account

const DeleteAccount = (req, res) => {
    const params = req.params;
    const idRestaurant = params.id;
    if (idRestaurant == null || idRestaurant == "") {
        console.log("Error al eliminar Cuenta id nulo");
    } else {
        Restaurante.findByIdAndRemove({_id: idRestaurant}, (err, resDelete) => {
            if (err) {
                console.log("Error al eliminar la cuenta", err)
                res.status(500).send({message: "Error del servidor."});
            } else {
                console.log("Cuenta eliminada")
                res.status(200).send({message: "Cuenta eliminada exitosamente."});
            }
        });
    }
}

const ChangePassword = (req, res) => {
    const params = req.params;
    const idRestaurant = params.id;
    const newPassword = params.pass;
    if (idRestaurant == null || idRestaurant == "") {
        console.log("Error al cambiar contraseña, id nulo");
    } else {
        if (newPassword == null || newPassword == "") {
            console.log("Error al cambiar contraseña, contraseña nula o invalida");
            //Enviar mensaje l cliente
        } else {
            bcrypt.hash(newPassword, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({message: "Error al encriptar la contraseña."});
                } else {
                    Restaurante.findByIdAndUpdate({_id: idRestaurant}, {password: hash},(err, resUpdate) => {
                        if (err) {
                            console.log("Error al cambiar la conraseña", err)
                            res.status(500).send({message: "Error del servidor."});
                        } else {
                            console.log("Contraseña modificada")
                            res.status(200).send({message: "Contraseña modificada exitosamente."});
                        }
                    });
                }
            });
        }
    }
}

const ChangeName = (req, res) => {
    const params = req.params;
    const idRestaurant = params.id;
    const newName = params.name;
    if (idRestaurant == null || idRestaurant == "") {
        console.log("Error al cambiar nombre, id nulo");
    } else {
        if (newName == null || newName == "") {
            console.log("Error al cambiar contraseña, contraseña nula o invalida");
            //Enviar mensaje l cliente
        } else {
            Restaurante.findByIdAndUpdate({_id: idRestaurant},{userName: newName}, (err, resUpdate) => {
                if (err) {
                    console.log("Error al cambiar el nombre", err)
                    res.status(500).send({message: "Error del servidor."});
                } else {
                    console.log("Nombre modificado")
                    res.status(200).send({message: "Nombre modificado exitosamente."});
                }
            });
        }
    }
}

const ChangePresentation = (req, res) => {
    const params = req.params;
    const idRestaurant = params.id;
    const newPresentation = params.presentation;
    if (idRestaurant == null || idRestaurant == "") {
        console.log("Error al cambiar nombre, id nulo");
    } else {
        if (newPresentation == null || newPresentation == "") {
            console.log("Error al cambiar contraseña, contraseña nula o invalida");
            //Enviar mensaje l cliente
        } else {
            Restaurante.findByIdAndUpdate({_id: idRestaurant},{presentation: newPresentation}, (err, resUpdate) => {
                if (err) {
                    console.log("Error al cambiar la presentación", err)
                    res.status(500).send({message: "Error del servidor."});
                } else {
                    console.log("Presentación modificada")
                    res.status(200).send({message: "Presentación modificada exitosamente."});
                }
            });
        }
    }
}

//Orders.

const updateOrderStatus = (req, res) => {
    const params = req.params;
    const idOrder = params.id;
    const idRestaurant = params.restaurant;
    const idComensal = params.comensal;
    const status = params.status;
    if (idRestaurant == null || idRestaurant == "") {
        console.log("Error al actualizar estatus de orden, id del restaurante nulo");
    } else {
        if (idComensal == null || idRestaurant == "") {
            console.log("Error al actualizar estatus de orden, id del comensal nulo");
        } else {
            if (status == null || status == "") {
                console.log("Error al actualizar estatus de orden, estatus nulo");
            } else {
                OrdersModel.findByIdAndUpdate({_id: idOrder}, (err, resUpdate) => {
                   if (err) {
                       console.log("Error al actualizar estatus de orden", err);
                       res.status(500).send({message: "Error del servidor."});
                   } else {
                       console.log("Estatus actualizado.", resUpdate);
                       res.status(200).send({message: "Estatus actualizado."});
                   }
                });
            }
        }
    }
}

const cancelOrder = (req, res) => {
    const params = req.params;
    //O eliminamos la cuenta por el id del restaurante o la eliminamos por el id de la propia irdeb
    //const idRestaurant = params.restaurant;
    const idOrder = params.id;
    if (idOrder == null || idOrder == "") {
        console.log("Error al eliminar la ornden, id nulo");
    } else {
        OrdersModel.findByIdAndDelete({_id: idOrder}, (err, resDelete) => {
            if (err) {
                console.log("Error al eliminar la orden...", err);
                res.status(500).send({message: "Error en el servidor"});
            } else {
                console.log("Orden cancelada ...", resDelete);
                res.status(200).send({message: "Orden cancelada."})
            }
        });
    }
}

const getCurrentOrders = (req,res) => {

    const params = req.params
    const nombre = params.nombre //Cambiar por nombre
    OrdersModel.find({Restaurante: nombre}, (err,resOrders) => {
        if(err){
            res.status(404).send({message: "Error en el servidor."})
            console.log(err)
        }else{
            if(!resOrders || resOrders == ""){
                res.status(500).send({message: "Aún no tienes órdenes en progreso."})
            }else{

                const arrayIds =[]
                const arrayNombresPlatillos = []
                const arrayTotal = []
                var platillosConcatenados = ""
                var arrayConcatenados = []

                for(let i = 0; i < resOrders.length ; i++){
                    arrayIds.push(resOrders[i]._id)
                    arrayNombresPlatillos.push(resOrders[i].Platillos)
                    arrayTotal.push(resOrders[i].Total)
                    for(let j = 0; j < resOrders[i].Platillos.length; j++){
                        platillosConcatenados += (resOrders[i].Platillos[j].nombre) + ", "
                    }
                    arrayConcatenados.push(platillosConcatenados)
                    platillosConcatenados = "";
                }

                console.log(arrayConcatenados)
                /*
                * ID del comensal de la orden
                * totales
                * nombres
                * */

                const arrays = [{
                   "idOrden": arrayIds,
                    "total": arrayTotal,
                    "platillos":arrayConcatenados
                }
                ]
                res.status(200).send(arrays)
            }
        }
    })

}

const getHistoryOrders = (req,res) => {
    const params = req.params
    const nombre = params.nombre
    VentasModel.find({Restaurante: nombre}, (err,resOrders) => {
        if(err){
            res.status(404).send({message: "Error en el servidor."})
            console.log(err)
        }else{
            if(!resOrders || resOrders == ""){
                res.status(500).send({message: "Aún no tienes órdenes en historial."})
            }else{

                const arrayIds =[]
                const arrayNombresPlatillos = []
                const arrayTotal = []
                const arrayFechas = []
                var platillosConcatenados = ""
                var arrayConcatenados = []

                for(let i = 0; i < resOrders.length ; i++){
                    arrayIds.push(resOrders[i]._id)
                    arrayNombresPlatillos.push(resOrders[i].Platillos)
                    arrayTotal.push(resOrders[i].Total)
                    arrayFechas.push(resOrders[i].Fecha)
                    for(let j = 0; j < resOrders[i].Platillos.length; j++){
                        platillosConcatenados += (resOrders[i].Platillos[j].nombre) + ", "
                    }
                    arrayConcatenados.push(platillosConcatenados)
                    platillosConcatenados = "";
                }

                console.log(arrayConcatenados)
                /*
                * ID del comensal de la orden
                * totales
                * nombres
                * fecha
                * */

                const arrays = [{
                    "idOrden": arrayIds,
                    "total": arrayTotal,
                    "platillos":arrayConcatenados,
                    "fecha": arrayFechas
                }
                ]
                res.status(200).send(arrays)
            }
        }
    })

}

const setStatus = (req,res) => {
    const params = req.params
    const id = params.idOrden
    const statusRecibido = params.state
    OrdersModel.findById((id), (err, statusData) => {
        if(err){
            res.status(404).send({message: "Error en el servidor"})
            console.log(err)
        }else{
            if(!statusData){
                res.status(500).send({message :"No se encontró nada"})
            }else{
                if(statusRecibido == "0"){
                    statusData.Estatus = "Enviada"
                    statusData.save()
                    res.status(200).send()
                }else if(statusRecibido == "1"){
                    statusData.Estatus = "Cocinando"
                    statusData.save()
                    res.status(200).send()
                }else{
                    statusData.Estatus = "Entragado"
                    statusData.save()
                    res.status(200).send()
                }

            }
        }
    })
}

module.exports = {
    SignUp,
    SignIn,
    DeleteAccount,
    ChangePassword,
    ChangeName,
    ChangePresentation,
    getCode,
    saveMenu,
    updateOrderStatus,
    cancelOrder,
    getMenu,
    getCurrentOrders,
    updateMenu,
    deleteMenu,
    setStatus,
    getHistoryOrders,
    getPresentacion,
};
