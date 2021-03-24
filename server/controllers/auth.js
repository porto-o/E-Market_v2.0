const jwt = require("../services/jwt");
const moment = require("moment");
const Comensal = require("../models/ComensalModel");
const Restaurante = require("../models/RestauranteModel");
//función para checar si el token ha experiado

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

function refreshAccessToken(req, res) {
  const { refreshToken, accessToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);
    const { role } = jwt.decodedToken(accessToken);
if(role === "comensal"){
    Comensal.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "Usuario no encontrado." });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken,
            message: jwt.decodedToken(accessToken),
          });
        }
      }
    });
  }else{
    Restaurante.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "Usuario no encontrado." });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken,
            message: jwt.decodedToken(accessToken),
          });
        }
      }
    });
  }
}
}
module.exports = {
  refreshAccessToken,
};
