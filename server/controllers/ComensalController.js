const bcrypt = require("bcrypt-nodejs"); // encriptar contraseñas
const jwt = require("../services/jwt");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51I76NLIDgbX8kir9GV5rUDxDj0DVlwXg2bb0w20LR2Hs047utSxuomDtSIv8FtitbOUVSYsgk3zkxUsZjcNdw6u500QxT81uMm"
);
const Comensal = require("../models/ComensalModel");
const Restaurant = require("../models/RestauranteModel");
const MiLista = require("../models/MiListaModel");
const OrdersModel = require("../models/OrdenesModel");
const Menu = require("../models/MenuModel");
const VentasModel = require("../models/VentasModel");
const TicketsModel = require("../models/TicketsModel");
const pdf = require("html-pdf");
const crypto = require("crypto");
const fs = require("fs");

const SignUp = (req, res) => {
  const user = new Comensal();
  const { userName, email, password, photo } = req.body;
  user.userName = userName;
  user.email = email.toLowerCase();
  user.role = "comensal";
  user.photo = photo;

  if (!password) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res
              .status(500)
              .send({ message: "El nombre de usuario o correo ya existe." });
          } else {
            if (!userStored) {
              res.status(404).send({ message: "Error al crear el usuario." });
            } else {
              res.status(200).send({ user: userStored });
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

  Comensal.findOne({ userName }, (err, userStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            res.status(200).send({
              accessToken: jwt.createAccessToken(userStored),
              refreshToken: jwt.createRefreshToken(userStored),
            });
          }
        });
      }
    }
  });
};

const AddRestaurant = (req, res) => {
  const params = req.params;
  const id = params.id;
  const pin = JSON.parse(params.data);
  const list = MiLista();
  if (pin.pin == null || pin.pin == "") {
    res.status(500).send({ message: "No se agrego ningun codigo" });
  } else {
    MiLista.findOne({ Comensal: id }, (err, listData) => {
      if (err) {
        res.status(500).send({ message: "Error al buscar una lista" });
      } else {
        if (!listData) {
          //aqui la creamos
          console.log("No hay lista vinculada a esta cuenta");
          Restaurant.findOne({ codeRes: pin.pin }, (err, restaurantData) => {
            if (err) {
              res
                .status(500)
                .send({ message: "Error al buscar el restaurante " });
            } else {
              if (!restaurantData) {
                console.log("No existe el restaurante");
                res.status(404).send({
                  message:
                    "El cógido ingresado no corresponde a ningún restaurante.",
                });
              } else {
                const restaurantes = {
                  restaurantId: restaurantData.id,
                  restaurantName: restaurantData.userName,
                  restaurantPin: restaurantData.codeRes,
                };
                list.Comensal = id;
                list.Restaurantes = restaurantes;
                list.save((err, res2) => {
                  if (err) {
                    console.log("Error al guardar la lista", err);
                  } else {
                    console.log(("Se guardo correctamente la lista", res2));
                    res.status(200).send(res2);
                  }
                });
              }
            }
          });
        } else {
          //aqui actualiamos
          console.log("La cuenta tiene una lista");
          MiLista.findOne({ Comensal: id }, (err, existingListData) => {
            if (err) {
              console.log("error al encontrar la lista ", err);
            } else {
              Restaurant.findOne(
                { codeRes: pin.pin },
                (err, restaurantData) => {
                  if (err) {
                    res.status(500).send({
                      message:
                        "Error al buscar el restaurante, intente más tarde.",
                    });
                  } else {
                    if (!restaurantData) {
                      console.log("No existe el restaurante");
                      res.status(404).send({
                        message:
                          "El cógido ingresado no corresponde a ningún restaurante.",
                      });
                    } else {
                      const array = existingListData.Restaurantes;
                      const indexes = [];
                      const element = {
                        restaurantName: restaurantData.userName,
                        restaurantPin: restaurantData.codeRes,
                      };
                      for (let i = 0; i < array.length; i++) {
                        if (array[i].restaurantName == element.restaurantName) {
                          indexes.push(1);
                        }
                      }
                      if (indexes.length > 0) {
                        console.log("Ya existe", indexes.length);
                        res.status(500).send({
                          message:
                            "Ya tienes ese restaurante agregado a tu lista.",
                        });
                      } else {
                        array.push(element);
                        console.log(array);
                        MiLista.findOneAndUpdate(
                          { Comensal: id },
                          { Restaurantes: array },
                          (Err, resUpdate) => {
                            if (Err) {
                              console.log(
                                "error al actualizar el array de objetos ",
                                Err
                              );
                            } else {
                              console.log("Se actualizo ", resUpdate);
                              res.status(200).send(resUpdate);
                            }
                          }
                        );
                      }
                    }
                  }
                }
              );
            }
          });
        }
      }
    });
  }
};

//INFO

const getInfoComensal = (req, res) => {
  const params = req.params;
  const nombre = params.nombre;
  const id = params.id;
  if (id == null || id == "" || id == "null") {
    Comensal.findOne({ userName: nombre }, (err, reSearch) => {
      if (err) {
        console.log("Error al obtener información: " + err);
      } else {
        const info = {
          name: reSearch.userName,
          email: reSearch.email,
          photo: reSearch.photo,
        };
        res.status(200).send(info);
      }
    });
  } else {
    Comensal.findById({ _id: id }, (err, reSearch) => {
      if (err) {
        console.log("Error al obtener información: " + err);
      } else {
        const info = {
          name: reSearch.userName,
          email: reSearch.email,
          photo: reSearch.photo,
        };
        res.status(200).send(info);
      }
    });
  }
};

const getRestaurants = (req, res) => {
  const body = req.params;
  const idComensal = body.id;

  MiLista.findOne({ Comensal: idComensal }, (err, listData) => {
    if (err) {
      res.status(404).send({ message: "Error del servidor." });
    } else {
      if (!listData) {
        res.status(500).send({ message: "No tienes restaurantes" });
      } else {
        listData.Restaurantes.filter(function (el) {
          Restaurant.findOne(
            { userName: el.restaurantName },
            (err2, reSearch) => {
              if (err2) {
                console.log("Error al obtener la información: " + err2);
              } else {
                const info = {
                  phone: reSearch.phone,
                  code: reSearch.codeRes,
                  presentation: reSearch.presentation,
                  admin: reSearch.administrator,
                  email: reSearch.email,
                  photo: reSearch.photo,
                };
              }
            }
          );
        });
        //console.log(listData.Restaurantes);
        res.status(200).send(listData.Restaurantes);
      }
    }
  });
};

//Account

const DeleteAccount = (req, res) => {
  const params = req.params;
  const idComensal = params.id;
  if (idComensal == null || idComensal == "") {
    console.log("Error al eliminar Cuenta id nulo");
  } else {
    MiLista.findOneAndDelete({ Comensal: idComensal }, (err, resDelete) => {
      if (err) {
        console.log("Error al eliminar la lista", err);
      } else {
        console.log("Lista eliminada");
      }
    });
    Comensal.findOneAndRemove({ _id: idComensal }, (err, resDelete) => {
      if (err) {
        console.log("Error al eliminar la cuenta", err);
        res.status(500).send({ message: "Error del servidor." });
      } else {
        console.log("Cuenta eliminada");

        res.status(200).send(
          {
            message: "Cuenta eliminada exitosamente.",
          } /*, {
                              accessToken: localStorage.removeItem(),
                              refreshToken: localStorage.removeItem(),
                          }*/
        );
      }
    });
  }
};

const getMenus = (req, res) => {
  const params = req.params;
  const nombreRestaurante = params.nombre;
  let id;
  /*
   * Buscar restaurante con el nombre recibido en Restaurante
   * Buscar con el id recibido en el Menumodel
   * Obtener menu
   * Validar si el menú está vacío y mandar respuesta al cliente
   * */
  Restaurant.findOne({ userName: nombreRestaurante }, (err, resR) => {
    if (err) {
      console.log("Error 1 " + err);
    } else {
      id = resR.id; //Recibiendo el ID del restaurante
      Menu.findOne({ Restaurante: id }, (err, resMenu) => {
        if (err) {
          console.log("Error 2 " + err);
        } else {
          if (!resMenu) {
            res.status(500).send({
              message:
                "El restaurante aún no tiene un menú. Comunícate con el gerente.",
            });
          } else {
            res.status(200).send(resMenu.Menu);
          }
        }
      });
    }
  });
};

const ChangePassword = (req, res) => {
  const params = req.params;
  const idComensal = params.id;
  const newPassword = params.pass;
  if (idComensal == null || idComensal == "") {
    console.log("Error al cambiar contraseña, id nulo");
  } else {
    if (newPassword == null || newPassword == "") {
      console.log("Error al cambiar contraseña, contraseña nula o invalida");
      //Enviar mensaje l cliente
    } else {
      bcrypt.hash(newPassword, null, null, function (err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          Comensal.findByIdAndUpdate(
            { _id: idComensal },
            { password: hash },
            (err, resUpdate) => {
              if (err) {
                console.log("Error al cambiar la conraseña", err);
                res.status(500).send({ message: "Error del servidor." });
              } else {
                console.log("Contraseña modificada");
                res
                  .status(200)
                  .send({ message: "Contraseña modificada exitosamente." });
              }
            }
          );
        }
      });
    }
  }
};

const ChangeName = (req, res) => {
  const params = req.params;
  const idComensal = params.id;
  const newName = params.name;
  if (idComensal == null || idComensal == "") {
    console.log("Error al cambiar nombre, id nulo");
  } else {
    if (newName == null || newName == "") {
      console.log("Error al cambiar nombre, nombre nulo o invalido");
      //Enviar mensaje l cliente
    } else {
      Comensal.findByIdAndUpdate(
        { _id: idComensal },
        { userName: newName },
        (err, resUpdate) => {
          if (err) {
            console.log("Error al cambiar el nombre", err);
            res.status(500).send({ message: "Error del servidor." });
          } else {
            console.log("Nombre modificado");
            res
              .status(200)
              .send({ message: "Nombre modificado exitosamente." });
          }
        }
      );
    }
  }
};

const eliminarRestaurante = (req, res) => {
  const params = req.params;
  const nombre = params.nombre;
  const id = params.id;

  MiLista.updateOne(
    { Comensal: id },
    { $pull: { Restaurantes: { restaurantName: { $eq: nombre } } } },
    (err, deleteData) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!deleteData) {
          res.status(404).send({
            message: "Error en el servidor, no encuentro ese restaurante",
          });
        } else {
          res.status(200).send(null);
        }
      }
    }
  );
};

const ChangePhoto = (req, res) => {
  const params = req.body;
  const idComensal = params.id;
  const newPhoto = params.photo;
  if (idComensal == null || idComensal == "") {
    console.log("Error al cambiar foto, id nulo");
  } else {
    if (newPhoto == null || newPhoto == "") {
      console.log("Error al cambiar foto, foto nula o invalida");
      //Enviar mensaje l cliente
    } else {
      Comensal.findByIdAndUpdate(
        { _id: idComensal },
        { photo: newPhoto },
        (err, resUpdate) => {
          if (err) {
            console.log("Error al cambiar el foto", err);
            res.status(500).send({ message: "Error del servidor." });
          } else {
            res.status(200).send({ message: "Foto modificada exitosamente." });
          }
        }
      );
    }
  }
};

//Orders

const addOrder = (req, res) => {
  const order = OrdersModel();
  const params = req.params;
  const comensal = params.idComensal;
  const restaurantName = params.restaurantName;
  const orderDate = new Date();
  const orderSent = params.order;
  const dishes = orderSent.split(",");

  if (comensal == null || comensal == "") {
    console.log("Error al agregar la orden, id del comensal nulo");
  } else {
    if (restaurantName == null || restaurantName == "") {
      console.log("Error al agregar la orden, id del restaurante nulo");
    } else {
      Restaurant.findOne({ userName: restaurantName }, (errorRFO, resRFO) => {
        if (errorRFO) {
          console.log("Error en el servidor al buscar restaurante");
          res.status(500).send({ message: "Error en el servidor" });
        } else {
          if (!resRFO) {
            console.log("Restaurante no encontrado");
            //res.status(500).send({message: "No se encontro el restaurante"})
          } else {
            const idRestaurant = resRFO._id;
            Menu.findOne({ Restaurante: idRestaurant }, (errorMFO, resMFO) => {
              if (errorRFO) {
                console.log(
                  "Error en el servidor al buscar el menú del restaurante restaurante"
                );
                //res.status(500).send({message: "Error en el servidor"})
              } else {
                if (!resMFO) {
                  console.log("Menú no encontrado");
                  //res.status(500).send({message: "No se encontro el restaurante"})
                } else {
                  const restaurantMenuArray = resMFO.Menu;
                  //console.log(restaurantMenuArray)
                  const dishesObject = [];
                  var obj;
                  let total = 0;
                  let tiempo = 0;
                  let tiempos = 0;
                  for (let j = 0; j < dishes.length; j++) {
                    for (let i = 0; i < restaurantMenuArray.length; i++) {
                      if (restaurantMenuArray[i].nombre == dishes[j]) {
                        total += parseFloat(restaurantMenuArray[i].precio);
                        tiempos = parseInt(restaurantMenuArray[i].tiempoPrep);
                        tiempo += tiempos;
                        obj = {
                          nombre: dishes[j],
                          precio: restaurantMenuArray[i].precio,
                          tiempoPrep: tiempo
                        };
                        dishesObject.push(obj);
                      }
                    }
                  }
                  OrdersModel.findOne(
                    { Comensal: comensal },
                    (err, resSearch) => {
                      if (err) {
                        console.log("Error al encontrar la orden");
                      } else {
                        //Si no existe
                        if (!resSearch) {
                          order.Comensal = comensal;
                          order.Restaurante = resRFO.userName;
                          order.Total = total.valueOf();
                          order.Fecha = orderDate;
                          order.Platillos = dishesObject;
                          order.Tiempo = tiempo;
                          order.Estatus = "Enviada";
                          order.save((err, resSave) => {
                            if (err) {
                              console.log("Error al guardar la orden", err);
                              res.status(500).send({
                                message: "No se logro generar la orden",
                              });
                            } else {
                              console.log("Orden generada exitosamente");
                              res
                                .status(200)
                                .send({ message: "Orden enviada" });
                            }

                            //Aquí estaba el de actualizar número de vetas
                          });
                        } else {
                          //Si existe se actualiza
                          const arrayUpdateDishes = resSearch.Platillos;
                          for (let i = 0; i < dishesObject.length; i++) {
                            arrayUpdateDishes.push(dishesObject[i]);
                          }
                          const suma = parseFloat(resSearch.Total) + total;
                          const newTotal = suma.valueOf();
                          OrdersModel.findOneAndUpdate(
                            { Comensal: comensal },
                            { Platillos: arrayUpdateDishes, Total: newTotal },
                            (error, resUpdate) => {
                              if (error) {
                                console.log(
                                  "Error al actualizar la orden",
                                  error
                                );
                                res.status(500).send({
                                  message: "Error al actualizar la orden",
                                });
                              } else {
                                console.log("Orden actualizada");
                                res
                                  .status(200)
                                  .send({ message: "Orden actualizada" });
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                }
              }
            });
          }
        }
      });
    }
  }
};

const cancelOrder = (req, res) => {
  const params = req.params;
  //O eliminamos la cuenta por el id del comensal o la eliminamos por el id de la propia irdeb
  //const idComensal = params.comensal;
  const idComensal = params.id;
  if (idComensal == null || idComensal == "") {
    console.log("Error al eliminar la ornden, id nulo");
  } else {
    OrdersModel.findOneAndDelete({ Comensal: idComensal }, (err, resDelete) => {
      if (err) {
        console.log("Error al eliminar la orden...", err);
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        console.log("Orden cancelada");
        res.status(200).send({ message: "Orden cancelada." });
      }
    });
  }
};

const getOrder = (req, res) => {
  const params = req.params;
  //const idOrder = params.id;
  const idComensal = params.comensal;
  OrdersModel.findOne({ Comensal: idComensal }, (err, resSearch) => {
    if (err) {
      console.log("Error al buscar la orden");
    } else {
      if (!resSearch) {
        console.log("No tienes ninguna orden");
      } else {
        res.status(200).send({ order: resSearch });
      }
    }
  });
};

const getTickets = (req, res) => {
  const params = req.params;
  const nombre = params.nombre; //Cambiar por nombre

  TicketsModel.find({ Comensal: nombre }, (err, resOrders) => {
    if (err) {
      res.status(404).send({ message: "Error en el servidor." });
      console.log(err);
    } else {
      if (!resOrders || resOrders == "") {
        res
          .status(500)
          .send({ message: "Aún no haz realizado ninguna compra." });
      } else {
        const arrayIds = [];
        const arrayNombresPlatillos = [];
        const arrayTotal = [];
        const arrayFecha = [];
        var platillosConcatenados = "";
        var arrayConcatenados = [];

        for (let i = 0; i < resOrders.length; i++) {
          arrayIds.push(resOrders[i]._id);
          arrayNombresPlatillos.push(resOrders[i].Platillos);
          arrayTotal.push(resOrders[i].Total);
          arrayFecha.push(resOrders[i].Fecha);
          for (let j = 0; j < resOrders[i].Platillos.length; j++) {
            platillosConcatenados += resOrders[i].Platillos[j].nombre + ", ";
          }
          arrayConcatenados.push(platillosConcatenados);
          platillosConcatenados = "";
        }
        const arrays = [
          {
            idOrden: arrayIds,
            total: arrayTotal,
            platillos: arrayConcatenados,
            fecha: arrayFecha,
          },
        ];
        res.status(200).send(arrays);
      }
    }
  });
};

const getStatus = (req, res) => {
  const params = req.params;
  const id = params.id;

  OrdersModel.findOne({ Comensal: id }, (err, statusData) => {
    if (err) {
      console.log("Error en obtener el status: " + err);
      res.status(404).send({ message: "Error en el servidor" });
    } else {
      if (!statusData) {
        res
          .status(500)
          .send({ message: "No tienes ninguna orden en progreso." });
      } else {
        const status = statusData.Estatus;
        const tiempo = statusData.Tiempo;
        res.status(200).send({ status, tiempo });
      }
    }
  });
};

const setStripe = (req, res) => {
  const params = req.params;
  const idUser = params.id;
  OrdersModel.findOne({ Comensal: idUser }, async (err, menuData) => {
    if (err) {
      console.log(err);
    } else {
      if (!menuData) {
        console.log("No hay ordenes en progreso");
      } else {
        var platillos = menuData.Platillos;
        var total = menuData.Total;
        console.log(
          "antes de generar la sesión para el pago de stripe linea 862 del comensal"
        );
        
          const session = await pagoStrip(platillos, total);
        //Generando PDF
        

        const venta = VentasModel();
        const ticket = TicketsModel();
        Comensal.findOne({ _id: idUser }, (error3, resCFO) => {
          if (error3) {
            console.log("Error al buscar al cliente");
          } else {
            if (!resCFO) {
              console.log("No se encontro al Comensal");
            } else {
              var comensalName = resCFO.userName;
              venta.Comensal = comensalName;
              venta.Restaurante = menuData.Restaurante;
              venta.Total = total;
              venta.Fecha = new Date();
              venta.Platillos = menuData.Platillos;
              venta.save((error4, resVS) => {
                if (error4) {
                  console.log("Error al guardar la orden en el restaurante");
                } else {
                  ticket.Comensal = comensalName;
                  ticket.Restaurante = menuData.Restaurante;
                  ticket.Total = total;
                  ticket.Fecha = new Date();
                  ticket.Platillos = menuData.Platillos;
                  ticket.save((error5, resTS) => {
                    if (error5) {
                      console.log(
                        "Error al guardar la orden en el restaurante"
                      );
                    } else {
                      console.log(
                        "Orden guardada exitosamente en el restaurante"
                      );
                      OrdersModel.findOneAndDelete(
                        { Comensal: idUser },
                        (error5, resOMFOAD) => {
                          if (error5) {
                            console.log(
                              "Error al eliminar la orden del comensal"
                            );
                          } else {
                            console.log("Orden eliminada despues del pago");
                          }
                        }
                      );
                    }
                  });
                }
              });
            }
          }
        });

        res.json({ id: session.id });
      }
    }
  });
};


const pagoStrip = async (platillos, total) => {


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    locale: "es",
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: {
            name: `${platillos.map((item) => item.nombre)}`,
          },
          unit_amount: total + 0 + 0,
        },
        quantity: 1,
      },
    ],
    mode: "payment",

    // cambiar las url de localhost al dominio del cliente en producción
    success_url: `https://e-marke7.netlify.app/comensal/success`,
    cancel_url: "https://e-marke7.netlify.app/comensal/status",
  });

  return session
}


const getPresentacion = (req, res) => {
  const params = req.params;
  const idComensal = params.id;

  OrdersModel.findOne({ Comensal: idComensal }, (err, resName) => {
    if (err) {
      console.log("Error en el servidor: ", err);
    } else {
      if (!resName) {
        console.log("No hay datos que coincidan");
      } else {
        const nombreRestaurante = resName.Restaurante;
        //res.status(200).send({nombreRestaurante})
        Restaurant.findOne({ userName: nombreRestaurante }, (err, des) => {
          if (err) {
            console.log("error 2 en el servidor");
          } else {
            if (!des) {
              console.log("No hay datsos");
            } else {
              const descripcion = des.presentation;
              const datos = {
                nombreRestaurante,
                descripcion,
              };
              res.status(200).send(datos);
            }
          }
        });
      }
    }
  });
};

const verificarFirma = (req, res) => {
  const params = req.body;
  const firma = params.firma;
  const public_key = fs.readFileSync("./keys/privateKey.pem", "utf-8");

  const signature = fs.readFileSync("signature.txt", "utf-8");

  const doc = fs.readFileSync("./ticket.pdf");

  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.write(doc);
  verifier.end();

  const result = verifier.verify(public_key, signature, "base64");
  if (result) {
    res.status(200).send(result);
  } else {
    console.log(result);
    res.status(500).send({
      message: "Error 406, la firma no es válida para el ticket generado.",
    });
  }
};

const getRecomendados = (req, res) => {
  Restaurant.find((err, restaurantes) => {
    if (err) {
      console.log("Error al obtener los restaurantes recomendados");
      res.status(500).send({ message: "Error en el servidor, estatus 500" });
    } else {
      if (!restaurantes) {
        res
          .status(400)
          .send({ message: "Aún no hay restaurantes para recomendar." });
      }
      res.status(200).send(restaurantes);
    }
  });
};

module.exports = {
  SignUp,
  SignIn,
  DeleteAccount,
  getRecomendados,
  ChangePassword,
  ChangeName,
  AddRestaurant,
  cancelOrder,
  getRestaurants,
  addOrder,
  getMenus,
  eliminarRestaurante,
  getInfoComensal,
  getStatus,
  setStripe,
  getOrder,
  getPresentacion,
  getTickets,
  verificarFirma,
  ChangePhoto
};
