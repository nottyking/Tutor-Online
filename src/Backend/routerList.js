const routerList = {
  path : [
    '/register',
    '/login',
    '/payment',
    '/student',
    '/course',
    '/home'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterRouter'),
    require('./Controller/Login/LoginRouter'),
    require('./Controller/Payment/PaymentRouter'),
    require('./Controller/Student/StudentRouter'),
    require('./Controller/Course/CourseRouter'),
    require('./Controller/Home/HomeRouter')
  ]
}

module.exports = routerList ;
