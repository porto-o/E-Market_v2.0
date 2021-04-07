const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestauranteSchema = Schema({
  userName: {
    type: String,
    unique: true
  },
  password: String,
  email: String,
  phone: String,
  schedule: Array,
  administrator: String,
  photo: String,
  presentation: String,
  codeRes: {
    type: String,
    unique: true
  },
  role: String,

  
});

module.exports = mongoose.model("Restaurante", RestauranteSchema);
