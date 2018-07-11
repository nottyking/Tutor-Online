const CryptoJS = require("crypto-js");
const SecretKey = 'SJag3SRNY:LWNg24er47s6hgGRyMLJnoaisbesbltwai3458r6toiETiaTo6532eihTtoewathO363e26ltWLTlwTiohTE72A4/LYeryHPEyHWETY45'

function encryptWithSecretkey(toEncrypt) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, SecretKey);
    return encrypted;
}

function decryptWithSecretkey(toDecrypt) {
    var decrypted = CryptoJS.AES.decrypt(toDecrypt, SecretKey);
    var decryptedData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    return decryptedData;
}

module.exports = {
    encryptWithSecretkey: encryptWithSecretkey,
    decryptWithSecretkey: decryptWithSecretkey
};