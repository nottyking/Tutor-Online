const app = require('express')
const router = app.Router();
const packageMainController = require('./PackageMainController');
const getFuncSpecial = require('../utilityfunction/GetDataSpecial')

router.post('/queryinformation', async(req, res) => {
  res.send(await packageMainController.queryInformation(req, res));
})

module.exports = router ;
