const app = require('express')
const router = app.Router();
const learningController = require('./LearningController')

router.post('/queryInformation', async(req, res) => {
  res.send(await learningController.queryInformation(req, res));
})

module.exports = router ;
