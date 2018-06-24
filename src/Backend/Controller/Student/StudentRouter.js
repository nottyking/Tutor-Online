const app = require('express')
const router = app.Router();
const mainController = require('./MainController');
const editProfileController = require('./editProfileController')

router.post('/queryInformation', async(req, res) => {
  res.send(await mainController.queryInformation(req, res));
})

router.post('/editProfile', (req, res) => {
  res.send(editProfileController.updateNewProfile(req, res));
})

router.post('/checkPassword', async(req, res) => {
  res.send(await editProfileController.checkPassword(req, res));
})

module.exports = router ;
