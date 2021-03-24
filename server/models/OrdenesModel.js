const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataType = mongoose.Types;

const OrdenesSchema = Schema({

    Comensal:{
        type: DataType.ObjectId,
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
    //Cambie los platillos para no tener problemas con dup_key
    // Platillos: {
    //         type: [DataType.ObjectId],
    //         required: true
    //     },
    Platillos: {
        type: [{
            nombre: String,
            precio: String
        }],
        required: true
    },
    Estatus: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Ordenes", OrdenesSchema);