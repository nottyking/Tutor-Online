const omise = require('../../Config/Omise');
const ipList = require('../../../Config/ipConfig');
const insertFunc = require('../utilityFunction/insertData')

function payByCreditCard(req, res){
  console.log("Enter Payment CreditCard");
  /*var omise = Omise({
    'secretKey': omiseConfig.omiseSecretKey,
    'omiseVersion': omiseConfig.omiseVersion
  });*/

  var orderID = '1'
  var userid = req.session.userid
  var amount = req.body.amount;
  var paymentTokenID = req.body.omiseToken;
  omise.charges.create({
    'description': 'Charge of userid: ' + userid,
    'amount' : amount,
    'currency': 'thb',
    'capture': true,
    'card': paymentTokenID
  }, async function(err, resp) {
    if (!resp.failure_message) {
      //Success
      console.log("Payment Success");

      var result = await storeEnrolledCourse(req.session.userid,req.body.courseid);

      res.redirect(ipList.frontend)
      return result;

    } else {
      console.log("Payment error");
      //Handle failure
      throw resp.failure_code;
    }
  });
}

async function storeEnrolledCourse(userid, courseid){
  // console.log();
  // console.log("req.session:",req.session);
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
