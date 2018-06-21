const routerList = {
  path : [
    '/register',
    '/login',
    '/payment',
    '/student'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterRouter'),
    require('./Controller/Login/LoginRouter'),
    require('./Controller/Payment/PaymentRouter'),
    require('./Controller/Student/StudentRouter')
  ]
}

module.exports = routerList ;
