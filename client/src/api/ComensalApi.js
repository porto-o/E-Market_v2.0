import { BASE_PATH, API_VERSION } from "./config";

export function signUpApi(data) {
  const url = `${BASE_PATH}/${API_VERSION}/signupComensal`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };

  console.log("Datos recibidos en user.js cliente ", data);

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
  const url = `${BASE_PATH}/${API_VERSION}/signInComensal`;
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
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function AddRestaurantApi(id, data){
  const url = `${BASE_PATH}/${API_VERSION}/addRestaurant/${id}/${data}`;
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

export function getRestaurantApi(idComensal){
  console.log("id recibido para el getRestaurant API "+idComensal)
  const url = `${BASE_PATH}/${API_VERSION}/getRestaurante/${idComensal}`;

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

export function deleteAccountComensalApi (id) {
  const url = `${BASE_PATH}/${API_VERSION}//deleteAccountComensal/${id}`;
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

export function changeNameComensalApi(id, newName) {
  const url = `${BASE_PATH}/${API_VERSION}/changeNameComensal/${id}/${newName}`;
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

export function changePasswordComensalApi (id, pass) {
  const url = `${BASE_PATH}/${API_VERSION}/changePasswordComensal/${id}/${pass}`;
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

export function getMenuApi(nombreRestaurante){
  console.log("nombre recibido para el getMenuApi API "+nombreRestaurante)
  const url = `${BASE_PATH}/${API_VERSION}/getMenus/${nombreRestaurante}`;

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

export function ordenarApi(order, restaurantName, idComensal){
  console.log("Pedido recibido en ordsdenar API: ", order, restaurantName, idComensal)
  const url = `${BASE_PATH}/${API_VERSION}/ordenar/${order}/${restaurantName}/${idComensal}`;

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

export function eliminarRestauranteApi(nombre, id){

    const url = `${BASE_PATH}/${API_VERSION}/eliminarRestComensal/${nombre}/${id}`;

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
            console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });

}

export function getStatusComensalApi(id) {
    const url = `${BASE_PATH}/${API_VERSION}/statusOrden/${id}`;

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

export function cancelOrderApi (id) {

    const url = `${BASE_PATH}/${API_VERSION}/cancelOrder/${id}`

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
            console.log(result);
            return result;
        })
        .catch((err) => {
            return err.message;
        });
}

export function getTicketsApi(nombre){

    const url = `${BASE_PATH}/${API_VERSION}/getTickets/${nombre}`;
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

export function getPresentacionApi(id){
    const url = `${BASE_PATH}/${API_VERSION}/getPresentacion/${id}`;

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

export function verificarFirma(firma){
    const url = `${BASE_PATH}/${API_VERSION}/verificarFirma`;

    const params = {
        method: "POST",
        body: firma,
        headers: {
            "Content-type": "application/json, Access-Control-Allow-Origin"
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
