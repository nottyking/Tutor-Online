const app = require('express')
const router = app.Router();
const StudentController = require('./StudentController');

router.post('/queryInformation', async(req, res) => {
  res.send(await StudentController.queryInformation(req, res));
})

module.exports = router ;
