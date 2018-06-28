const con = require('../../Config/database');
const jwt = require('jsonwebtoken')
const ipList = require('../../../Config/ipconfig')
const transporter = require('../../Config/NodeMailer').transporter
const EMAIL_SECRET = require('../../Config/NodeMailer').EMAIL_SECRET
const insertFunc = require('../utilityFunction/insertData')

// insert data for registering from role received
function register(req, res){
  return insertUser(req, res)
}

// insert user table and then insert role as student or admin table
async function insertUser(req,res){
  console.log("Enter register insertion");
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  var fname = req.body.fname
  var lname = req.body.lname
  var address = req.body.address
  var profileimage = req.body.profileimage
  var birthday = req.body.birthday
  var gender = req.body.gender
  var result = (await insertFunc.insertUser(username, password, email, fname, lname, address, profileimage, birthday, gender)).result;

  sendConfirmationEmail(result.insertId, email);
  return({
    result : true ,
    msg : "Success!"
  });
}

// send confirmation email by asynchronous
function sendConfirmationEmail(userid, email){
  jwt.sign(
    {
      userid: userid
    },
    EMAIL_SECRET,
    {
      expiresIn: '1d'
    },
    (err, emailToken) => {
      const url = ipList.backend + `/register/confirmation/${emailToken}`;
      console.log("Send to Email:",email);
      transporter.sendMail({
        to: email ,
        subject: 'Confirmation Email' ,
        html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
      })
    }
  )
}

module.exports = {register: register} ;
