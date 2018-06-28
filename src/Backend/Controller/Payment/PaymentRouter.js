const app = require('express')
const router = app.Router();
const CreditCardController = require('./CreditCardController');

router.post('/creditcard', (req, res) => {
  CreditCardController.payByCreditCard(req,res)
})

module.exports = router ;
