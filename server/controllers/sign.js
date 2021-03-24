const crypto = require('crypto');
const fs = require('fs');

function firma () {
    const private_key = fs.readFileSync('./keys/privateKey.pem', 'utf-8');

    const doc = fs.readFileSync('ticket.pdf');

    const signer = crypto.createSign('RSA-SHA256');
    signer.write(doc);
    signer.end();

    var signature = signer.sign(private_key, 'base64')

    console.log('Firma digital: ', signature);
    fs.writeFileSync('./signature.txt', signature);
    return signature
}

module.exports = {
    firma
}