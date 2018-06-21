const app = require('express')
const router = app.Router();
const StudentController = require('./StudentController');

router.post('/queryInformation', (req, res) => {
  res.send(StudentController.queryInformation(req, res));
})

module.exports = router ;
