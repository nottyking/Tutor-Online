const routerList = {
  path : [
    '/register',
    '/login',
    '/payment',
    '/student',
    '/course'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterRouter'),
    require('./Controller/Login/LoginRouter'),
    require('./Controller/Payment/PaymentRouter'),
    require('./Controller/Student/StudentRouter'),
    require('./Controller/Course/CourseRouter')
  ]
}

module.exports = routerList ;
