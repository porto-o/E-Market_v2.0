const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION , IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);
// Conectando a mongo mediante mongoose ODM
// Para sacar las cosas como acentos es con alt + 96

mongoose.connect(`mongodb+srv://portocreator:Pasodelcaballo2@e-market.ja68o.mongodb.net/E-Market?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, (err,res) => {
    if(err){
        throw err;
    }else{
        app.listen(port, () =>{            
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
        })
    }
});