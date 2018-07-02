const app = require('express')
const router = app.Router();
const studentMainController = require('./StudentMainController');
const editProfileController = require('./editProfileController')

router.post('/queryInformation', async(req, res) => {
  res.send(await studentMainController.queryInformation(req, res));
})

router.post('/editProfile/updateNewProfile', async(req, res) => {
  res.send(await editProfileController.updateNewProfile(req, res));
})

router.post('/editProfile/uploadProfileImage', async(req, res) => {
  res.send(await editProfileController.uploadProfileImage(req, res));
})

router.post('/checkPassword', async(req, res) => {
  res.send(await editProfileController.checkPassword(req, res));
})

module.exports = router ;
