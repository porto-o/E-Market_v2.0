import {API_VERSION, BASE_PATH} from "./config";
import jwtDecode from "jwt-decode";
import {REFRESH_TOKEN} from "../utils/constants";

export function signUpApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/signupRestaurante`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };

    console.log("Datos recibidos en RestaurantApi.js cliente ", data);

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            if (result.user)
                return {
                    status: 200,
                    message: "Usuario creado correctamente",
                };
            return {
                ok: false,
                message: result.message,
            };
        })
        .catch((err) => {
            return "Error en servidor, intentelo más tarde" + err.message;
        });
}

export function SignInApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/signInRestaurante`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function CodeApi(data) {
    const url = `${BASE_PATH}/${API_VERSION}/restaurante-code/${data}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result.message);
            localStorage.setItem("CODE", result.message);
            return result;
        })
        .catch((err) => {
            return err.message;
        });

}

export function getPresentacionApi(id){
    const url = `${BASE_PATH}/${API_VERSION}/getPresentacionRes/${id}`;
    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result.message);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function SaveMenuApi(data) {

    const id = jwtDecode(localStorage.getItem(REFRESH_TOKEN));

    const daticos = {
        "nombre": data.nomPlatillo,
        "descripcion": data.description,
        "precio": data.precio,
        "id": id.id
    }

    const url = `${BASE_PATH}/${API_VERSION}/saveMenu`;
    const params = {
        method: "PUT",
        body: JSON.stringify(daticos),
        headers: {
            "Content-type": "application/json",
        },
    };

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getMenuApi(id){
    const url = `${BASE_PATH}/${API_VERSION}/getMenu/${id}`;

    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    }

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function deleteAccountRestaurantApi (id) {
    const url = `${BASE_PATH}/${API_VERSION}//deleteAccountRestaurant/${id}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function changeNameRestaurantApi (id, newName) {
    const url = `${BASE_PATH}/${API_VERSION}/changeNameRestaurant/${id}/${newName}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
    });
}

export function changePresentationRestaurantApi (id, newPresentation) {
    const url = `${BASE_PATH}/${API_VERSION}/changePresentationRestaurant/${id}/${newPresentation}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function changePasswordRestaurantApi (id, pass) {
    const url = `${BASE_PATH}/${API_VERSION}/changePasswordRestaurant/${id}/${pass}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getOrdenesApi (nombre) {

    const url = `${BASE_PATH}/${API_VERSION}/getCurrentOrders/${nombre}`;
    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });

}

export function cancelOrderApi (idOrder) {
    const url = `${BASE_PATH}/${API_VERSION}/cancelOrderRestaurant/${idOrder}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);

            return result;
            /*{
                ok: false,
                    result: result};*/
        })
        .catch((err) => {
            return err.message;
        });
}

export function setStatusApi (state, id) {
    const url = `${BASE_PATH}/${API_VERSION}/setStatus/${state}/${id}`;
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function deleteMenu (id, dish, pos ){
    const url = `${BASE_PATH}/${API_VERSION}/deleteMenu/${id}/${dish}/${pos}`;
    console.log("Llegue al api con", dish, id, pos)
    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
    }

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function updateMenu (id, dish, newName, newDescription, newPrice, position){
    const url = `${BASE_PATH}/${API_VERSION}/updateMenu/${id}/${dish}/${newName}/${newDescription}/${newPrice}/${position}`;

    const params = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
    }

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getHistorialApi (nombre){
    const url = `${BASE_PATH}/${API_VERSION}/getHistoryOrders/${nombre}`;
    const params = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            //console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });

}

