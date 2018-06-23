const Omise = require('omise')
const omiseConfig = require('../../Config/Omise');
const ipList = require('../../../Config/ipConfig');
const insertFunc = require('../utilityFunction/insertData')

function payByCreditCard(req, res){
  console.log("Enter Payment CreditCard");
  var omise = Omise({
    'secretKey': omiseConfig.omiseSecretKey,
    'omiseVersion': omiseConfig.omiseVersion
  });

  // var orderID = req.body.orderID;
  console.log(req.body);
  var orderID = '1'
  var amount = req.body.amount;
  var paymentTokenID = req.body.omiseToken;
  omise.charges.create({
    'description': 'Charge for order ID: ' + orderID,
    'amount' : amount,
    'currency': 'thb',
    'capture': true,
    'card': paymentTokenID
  }, function(err, resp) {
    console.log("Charge res:",resp);
    console.log("Charge err:",err);
    if (!resp.failure_message) {
      console.log("Payment Success");

      storeEnrolledCourse(req.session.userid,req.body.courseid);

      return res.redirect(ipList.frontend)
      // return res.redirect()
      //Success
    } else {
      console.log("Payment error");
      //Handle failure
      throw resp.failure_code;
    }
  });
}

function storeEnrolledCourse(userid, courseid){
  // console.log();
  // console.log("req.session:",req.session);
  var d = new Date();
  var expireddate = new Date(d.getFullYear() + 1 , d.getMonth() , d.getDate())
  console.log("userid:",userid);
  console.log("courseid:",courseid);
  console.log("expired date:",expireddate);
  insertFunc.InsertEnrolledCourse(userid,courseid,expireddate);
}

module.exports = {
  payByCreditCard: payByCreditCard
};
