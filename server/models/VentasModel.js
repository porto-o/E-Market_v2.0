const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataType = mongoose.Types;

const VentasSchema = Schema({

    Comensal:{
        type: String,
        required: true
    },
    Restaurante: {
        type: String,
        required: true
    },
    Total:{
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    },
    Platillos: {
        type: [{
            nombre: String,
            precio: String
        }],
        required: true
    }
});

module.exports = mongoose.model("Ventas", VentasSchema);