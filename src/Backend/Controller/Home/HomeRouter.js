const app = require('express')
const router = app.Router();
const homeMainController = require('./HomeMainController');

router.post('/queryInformation', async(req, res) => {
  res.send(await homeMainController.queryInformation(req, res));
})

module.exports = router ;
