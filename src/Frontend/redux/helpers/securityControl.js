const Key = require('../constants/SecretKeyConstants')
const CryptoJS = require("crypto-js");

function getKeyConstant(keyType) {
    switch (keyType) {
        case "userKey":
            return Key.secretKeyConstant.USER_SECRETKEY;
        case "tokenKey":
            return Key.secretKeyConstant.TOKEN_SECRETKEY;
        default:
            return Key.secretKeyConstant.DEFAULT_SECRETKEY;
    }
}

function encryptWithSecretkey(toEncrypt, keyType) {
    var encrypted = CryptoJS.AES.encrypt(toEncrypt, getKeyConstant(keyType));
    try {
        return encrypted;
    } catch (error) {
        return { result: false }
    }
}

function decryptWithSecretkey(toDecrypt, keyType) {
    var decrypted = CryptoJS.AES.decrypt(toDecrypt, getKeyConstant(keyType));
    try {
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return { result: false }
    }
}

module.exports = {
    encryptWithSecretkey: encryptWithSecretkey,
    decryptWithSecretkey: decryptWithSecretkey
};