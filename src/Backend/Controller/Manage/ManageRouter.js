const app = require('express')
const router = app.Router();
const createCourseController = require('./CreateCourseController');
const createSubCourseController = require('./CreateSubCourseController')
const editCourseController = require('./EditCourseController');

router.post('/createcourse', async(req, res) => {
  res.send(await createCourseController.createCourse(req, res));
})

router.post('/createsubcourse', async(req, res) => {
  res.send(await createSubCourseController.createSubCourse(req, res));
})

router.post('/editcourse', async(req, res) => {
  res.send(await editCourseController.editCourseAndSubCourse(req, res));
})

module.exports = router ;
