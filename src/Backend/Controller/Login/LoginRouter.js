const app = require('express')
const router = app.Router();
const NormalLoginController = require('./NormalLoginController');

router.post('/normal', async(req, res) => {
  res.send(await NormalLoginController.LoginByNormal(req, res));
})

router.post('/facebook', (req, res) => {

})

router.post('/twitter', (req, res) => {

})

module.exports = router ;
