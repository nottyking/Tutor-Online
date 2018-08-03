const app = require('express')
const router = app.Router();
const CreditCardController = require('./CreditCardController');
const PackageCreditCardController = require('./Package/PackageCreditCardController')
const FreeController = require('./FreeController')

router.post('/creditcard', (req, res) => {
  CreditCardController.payByCreditCard(req,res, req.body.courseid)
})

router.post('/package/creditcard', (req, res) => {
  PackageCreditCardController.payByCreditCard(req, res)
})

router.post('/free', async(req, res) => {
  res.send(await FreeController.enrollFree(req, res))
})

module.exports = router ;
