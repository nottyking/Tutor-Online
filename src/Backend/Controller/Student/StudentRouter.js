const app = require('express')
const router = app.Router();
const studentMainController = require('./StudentMainController');
const editProfileController = require('./editProfileController')

router.post('/queryInformation', async(req, res) => {
  res.send(await studentMainController.queryInformation(req, res));
})

router.post('/editProfile/updateNewProfile', (req, res) => {
  res.send(editProfileController.updateNewProfile(req, res));
})

router.post('/editProfile/uploadProfileImage', (req, res) => {
  res.send(editProfileController.uploadProfileImage(req, res));
})

router.post('/checkPassword', async(req, res) => {
  res.send(await editProfileController.checkPassword(req, res));
})

module.exports = router ;
