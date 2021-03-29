const jwt = require("../services/jwt");
const moment = require("moment");
const Comensal = require("../models/ComensalModel");
const Restaurante = require("../models/RestauranteModel");

function willExpireToken(token) {
  const { exp } = jwt.decodedToken(token);
  const currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }
  return false;
}

const refreshAccessToken = (req, res) => {
  console.log("Estamos refrescando el access token");
  const { refreshToken } = req.body;
  const isTokenExpired = willExpireToken(refreshToken);

  if (isTokenExpired) {
    res.status(404).send({ message: "El refreshToken ha expirado" });
  } else {
    const { id } = jwt.decodedToken(refreshToken);

    Comensal.findOne({ _id: id }, (err, userStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!userStored) {
          res.status(404).send({ message: "Usuario no encontrado." });
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
                });
              }
            }
          });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refreshToken: refreshToken,
          });
        }
      }
    });
  }
};

module.exports = {
  refreshAccessToken,
};
