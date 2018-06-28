const updateFunc = require('../../utilityfunction/UpdateData')

async function editUser(req, res){
  console.log("Enter editUser in Managecontroller");
  var isbanned = req.body.isbanned;
  var role = req.body.role;
  var userid = req.body.userid;
  return await updateFunc.updateUserWithUserID(['isbanned', 'role'] ,
                                               [isbanned, role] ,
                                               ['userid'] ,
                                               [userid])
}

module.exports = {
  editUser : editUser,
}
