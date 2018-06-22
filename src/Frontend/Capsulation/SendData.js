const universalCookie = require('universal-cookie');
const cookies = new universalCookie();

function sendData(data){
    data.loginToken = cookies.get('loginToken');
    return data;
}

module.exports = {
  sendData: sendData
};
