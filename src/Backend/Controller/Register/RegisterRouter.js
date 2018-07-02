const app = require('express')
const router = app.Router();
const AccountFieldsController = require('./AccountFieldsController');
const SuccessController = require('./SuccessController');
const ConfirmatoinController = require('./ConfirmationController');

// insert student data for registering
router.post('/', async function(req, res){
  res.send(await SuccessController.register(req,res));
})

// check same username and email with database
router.post('/checkUsernameAndEmail', async(req, res) => {
  res.send(await AccountFieldsController.checkIsSameUsernameAndEmail(req, res));
})

router.get('/confirmation/:token', async(req, res) => {
  ConfirmatoinController.confirmRegister(req, res);
})

module.exports = router ;
