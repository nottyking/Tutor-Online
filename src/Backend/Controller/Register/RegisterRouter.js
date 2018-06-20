const app = require('express')
const router = app.Router();
const AccountFieldsController = require('./AccountFieldsController');
const SuccessController = require('./SuccessController');
const ConfirmatoinController = require('./ConfirmationController');

// check same username and email with database
router.post('/checkUsernameAndEmail', async(req, res) => {
  res.send(await AccountFieldsController.checkIsSameUsernameAndEmail(req, res));
})

// insert student data for registering
router.post('/registerAsStudent', function(req, res){
  res.send(SuccessController.registerAsRole('student',req,res));
})

// insert admin data for registering
router.post('/registerAsAdmin', function(req, res){
  res.send(SuccessController.registerAsRole('admin',req,res));
})

router.get('/confirmation/:token', async(req, res) => {
  ConfirmatoinController.confirmRegister(req, res);
})

module.exports = router ;
