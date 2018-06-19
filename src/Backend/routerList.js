const routerList = {
  path : [
    '/register',
    '/login'
  ] ,
  routeTo : [
    require('./Controller/Register/RegisterController'),
    require('./Controller/Login/LoginController')
  ]
}

module.exports = routerList ;
