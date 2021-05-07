const functions = require("firebase-functions");
const gcs = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;


exports.uploadFile = functions.https.onRequest((req,res) => {
    res.status(200).json({
        message: 'it worked!'
    });
});