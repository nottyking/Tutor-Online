const app = require('express')
const router = app.Router();
const packageMainController = require('./PackageMainController');

// check same username and email with database
router.post('/queryinformation', async(req, res) => {
  res.send(await packageMainController.queryInformation(req, res));
})

module.exports = router ;
