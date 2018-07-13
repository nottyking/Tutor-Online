const app = require('express')
const router = app.Router();
const learningController = require('./LearningController')
const progressController = require('./ProgressController')

router.post('/queryInformation', async(req, res) => {
  res.send(await learningController.queryInformation(req, res));
})

router.post('/progress/query', async(req, res) => {
  res.send(await progressController.queryProgress(req, res));
})

router.post('/progress/store', async(req, res) => {
  res.send(await progressController.storeProgress(req, res));
})

module.exports = router ;
