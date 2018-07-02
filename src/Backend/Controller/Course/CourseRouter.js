const app = require('express')
const router = app.Router();
const courseMainController = require('./CourseMainController');
const createReviewController = require('./CreateReviewController')

router.post('/queryInformation', async(req, res) => {
  res.send(await courseMainController.queryInformation(req, res));
})

router.post('/submitreview', async(req, res) => {
  console.log("body:",req.body);
  res.send(await createReviewController.createReview(req, res));
})

module.exports = router ;
