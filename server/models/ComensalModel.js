const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComensalSchema = Schema({
  userName: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  photo: String
});

module.exports = mongoose.model("Comensal", ComensalSchema);
