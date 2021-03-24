const fs = require('fs');
const qrcode = require('qrcode');

function qr (){

// Signature from sign.js
    const signature = fs.readFileSync('signature.txt', 'utf-8');
var qr = ""
    run().catch(error => console.error(error.stack));
    async function run() {
        let res = await qrcode.toDataURL(signature);

        fs.writeFileSync('./qr.html', `<img src="${res}">`);
        console.log('Wrote to ./qr.html');
        qr = res
        return res
    }
    console.log("En qr: "+qr)
    return qr
}
module.exports = {
    qr
}