const jwt = require('jwt-simple');
const moment = require('moment');

//creando clave secreta
const SECRET_KEY = "asf6sdaf9d89f416gdf489dgs651gds48896";

const createAccessToken = (user) => {
    const payLoad = {
        id: user._id,
        userName: user.userName,
        password: user.password,
        role: user.role,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    };

    return jwt.encode(payLoad, SECRET_KEY);
}

const createRefreshToken = (user) => {
    const payLoad = {
        id: user._id,
        exp: moment().add(30, "days").unix()
    }

    return jwt.encode(payLoad, SECRET_KEY);
}


const decodedToken = token => {
    return jwt.decode(token, SECRET_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodedToken
};
