const app = require('express')
const router = app.Router();
const NormalLoginController = require('./NormalLoginController');
const facebookLoginController = require('./FacebookLoginController');
const googleLoginController = require('./GoogleLoginController');

router.post('/normal', async(req, res) => {
  res.send(await NormalLoginController.LoginByNormal(req, res));
})

router.post('/facebook', async(req, res) => {
  res.send(await facebookLoginController.LoginByFacebook(req, res));
})

router.post('/google', async(req, res) => {
  res.send(await googleLoginController.LoginByGoogle(req, res));
})

module.exports = router ;
