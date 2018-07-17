const app = require('express')
const router = app.Router();
const manageMainController = require('./ManageMainController');
const manageMainUserController = require('./User/ManageMainUsercontroller')
const userEnrolledCourseController = require('./User/UserEnrolledCourseController')
const editUserController = require('./User/EditUserController')
const createCourseController = require('./Course/CreateCourseController');
const createSubCourseController = require('./Course/CreateSubCourseController')
const editCourseController = require('./Course/EditCourseController');
const deleteCourseController = require('./Course/DeleteCourseController');
const uploadImageController = require('./Course/UploadImageController')
const manageMainPackageController = require('./Package/ManageMainPackageController')
const createPackageController = require('./Package/CreatePackageController');
const uploadImagePackageController = require('./Package/UploadImageController')
const manageMainPaymentController = require('./Payment/ManageMainPaymentController')
// Home
router.post('/queryinformation', async(req, res) => {
  res.send(await manageMainController.queryInformation(req, res));
})

// User
router.post('/mainuser', async(req, res) => {
  res.send(await manageMainUserController.queryInformation(req, res));
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

// Package
router.post('/package/main', async(req, res) => {
  res.send(await manageMainPackageController.queryInformation(req, res));
})
router.post('/package/create', async(req, res) => {
  res.send(await createCourseController.createPackage(req, res));
})
router.post('/package/uploadbanner',async(req, res) => {
  res.send(await uploadImageController.uploadImage('Banner',req, res));
})
router.post('/package/uploadthumbnail',async(req, res) => {
  res.send(await uploadImageController.uploadImage('Thumbnail',req, res));
})

// Payment
router.post('/mainpayment', async(req, res) => {
  res.send(await manageMainPaymentController.queryInformation(req, res));
})

module.exports = router ;
