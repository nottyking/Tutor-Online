const app = require('express')
const router = app.Router();
const homeMainController = require('./HomeMainController');

router.post('/queryInformation', async(req, res) => {
  console.log("00000");
  res.send(await homeMainController.queryInformation(req, res));
  console.log("99999");
})

// router.post('/editProfile', (req, res) => {
//   res.send(editProfileController.updateNewProfile(req, res));
// })
//
// router.post('/checkPassword', async(req, res) => {
//   res.send(await editProfileController.checkPassword(req, res));
// })

module.exports = router ;
