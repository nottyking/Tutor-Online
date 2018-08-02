const omise = require('../../../Config/Omise');
const ipList = require('../../../../Config/ipConfig');
const insertFunc = require('../../utilityfunction/InsertData')
const updateFunc = require('../../utilityfunction/UpdateData')
const getFuncSpecial = require('../../utilityfunction/GetDataSpecial')

function payByCreditCard(req, res){
  console.log("Enter Package Payment CreditCard");
  var orderID = '1'
  var userid = req.session.userid
  var amount = req.body.amount;
  var paymentTokenID = req.body.omiseToken;
  const enrollingCourse = (req.body.courseid).split(",");
  console.log("QWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEe",enrollingCourse, typeof enrollingCourse);
  console.log("amount",amount);
  console.log("paymentTokenID",paymentTokenID);
  omise.charges.create({
    'description': 'Charge of userid: ' + userid,
    'amount' : amount,
    'currency': 'thb',
    'capture': true,
    'card': paymentTokenID
  }, async function(err, resp) {
    console.log("resp",resp);
    if (!resp.failure_message) {
      //Success
      console.log("Payment Success");

      var result = await managePackagePayment(req, res);

      res.redirect(ipList.frontend)
      return result;

    } else {
      console.log("Payment error");
      //Handle failure
      throw resp.failure_code;
    }
  });
}

async function managePackagePayment(req, res){
  const enrollingCourse = (req.body.courseid).split(",");
  console.log("!#!@#!@#@!!#",enrollingCourse);
  for(var i = 0 ; i < enrollingCourse.length ; i++){
    storeEnrolledCourse(req.session.userid, enrollingCourse[i])
  }
}

async function storeEnrolledCourse(userid, courseid){
  console.log("STORE");
  var d = new Date();
  var expireddate = new Date(d.getFullYear() + 1 , d.getMonth() , d.getDate())
  console.log("userid:",userid);
  console.log("courseid:",courseid);
  console.log("expired date:",expireddate);
  return await insertFunc.insertEnrolledCourse(userid,courseid,expireddate);
}

module.exports = {
  payByCreditCard: payByCreditCard
};
