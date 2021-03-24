const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DataType = mongoose.Types;

const MiListaSchema = Schema({

    Comensal: {
        type: DataType.ObjectId,
        unique: true,
        required: true
    },
    Restaurantes: {

        type: [{
            restaurantName: String,
            restaurantPin: String,
        }],
        required: true

    }

});

module.exports = mongoose.model("MiLista", MiListaSchema);