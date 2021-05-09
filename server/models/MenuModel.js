const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataType = mongoose.Types;

const MenuSchema = Schema({

    Restaurante: {
        type: DataType.ObjectId,
        unique: true,
        required: true
    },
    Menu:{
        type: [{
            nombre: String,
            precio: String,
            descripcion: String,
            ventas: String,
            dishPhoto: String,
            tiempoPrep: String
        }],
        required: true
    }

});

module.exports = mongoose.model("Menu", MenuSchema);