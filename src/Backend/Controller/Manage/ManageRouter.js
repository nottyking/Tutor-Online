const app = require('express')
const router = app.Router();
const manageMainController = require('./ManageMainController');
const editUserController = require('./User/EditUserController')
const createCourseController = require('./Course/CreateCourseController');
const createSubCourseController = require('./Course/CreateSubCourseController')
const editCourseController = require('./Course/EditCourseController');
const deleteCourseController = require('./Course/DeleteCourseController');
const uploadImageController = require('./Course/UploadImageController')
const manageMainCourseController = require('./User/ManageMainCoursecontroller')
const userEnrolledCourseController = require('./User/UserEnrolledCourseController')
const manageMainPaymentController = require('./Payment/ManageMainPaymentController')
// Home
router.post('/queryinformation', async(req, res) => {
  res.send(await manageMainController.queryInformation(req, res));
})

// User
router.post('/mainuser', async(req, res) => {
  res.send(await manageMainCourseController.queryInformation(req, res));
})
router.post('/userenrolledcourse', async(req, res) => {
  res.send(await userEnrolledCourseController.queryInformation(req, res));
})
router.post('/edituser', async(req, res) => {
  res.send(await editUserController.editUser(req, res));
})

// Course
router.post('/createcourse', async(req, res) => {
  res.send(await createCourseController.createCourse(req, res));
})
router.post('/createsubcourse', async(req, res) => {
  res.send(await createSubCourseController.createSubCourse(req, res));
})
router.post('/editcourse', async(req, res) => {
  res.send(await editCourseController.editCourseAndSubCourse(req, res));
})
router.post('/uploadbanner',async(req, res) => {
  res.send(await uploadImageController.uploadImage('Banner',req, res));
})
router.post('/uploadthumbnail',async(req, res) => {
  res.send(await uploadImageController.uploadImage('Thumbnail',req, res));
})
router.post('/deletecourse', async(req, res) => {
  res.send(await deleteCourseController.deleteCourse(req, res));
})

// Payment
router.post('/mainpayment', async(req, res) => {
  res.send(await manageMainPaymentController.queryInformation(req, res));
})

module.exports = router ;
