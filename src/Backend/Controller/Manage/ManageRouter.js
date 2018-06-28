const app = require('express')
const router = app.Router();
const manageMainController = require('./ManageMainController');
const editUserController = require('./User/EditUserController')
const createCourseController = require('./Course/CreateCourseController');
const createSubCourseController = require('./Course/CreateSubCourseController')
const editCourseController = require('./Course/EditCourseController');
const deleteCourseController = require('./Course/DeleteCourseController');


router.post('/queryinformation', async(req, res) => {
  res.send(await manageMainController.queryInformation(req, res));
})

router.post('/edituser', async(req, res) => {
  res.send(await editUserController.editUser(req, res));
})

router.post('/createcourse', async(req, res) => {
  res.send(await createCourseController.createCourse(req, res));
})

router.post('/createsubcourse', async(req, res) => {
  res.send(await createSubCourseController.createSubCourse(req, res));
})

router.post('/editcourse', async(req, res) => {
  res.send(await editCourseController.editCourseAndSubCourse(req, res));
})

router.post('/deletecourse', async(req, res) => {
  res.send(await deleteCourseController.deleteCourse(req, res));
})

module.exports = router ;
