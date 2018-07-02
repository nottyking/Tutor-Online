import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const UserActions = {
    register,
    login,
    logout
}

async function register(username, email, password, user_type) {
    const data = {
        username, email, password, user_type
    }

    console.log('before');
    var isSendSuccess = await axios.post(ipList.backend + '/register', {
        username: data.username, password: data.password, email: data.email,
        fname: '-', lname: '-', address: '-', birthday: '-', gender: '-'
    }).catch(err => {
        console.log(err);
        return failure(err);
    })

    const user = isSendSuccess.data
    console.log(user);
    if (user.msg === "Success!") {
        localStorage.setItem('user', JSON.stringify('RegisterComplete'));
        return success(user);
    }


    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

async function login(usernameEmail, password) {
    const data = {
        usernameEmail,
        password
    }

    console.log("Login");
    var isLoginSuccess = await axios.post(ipList.backend + '/login/normal', {
        usernameOrEmail: data.usernameEmail,
        password: data.password
    }).catch(msg => {
        console.log(msg);
        return failure(msg);
    });
    
    console.log("after send");
    
    const user = isLoginSuccess.data;
    console.log(user)
    if (user.result) {
        cookies.set("loginToken", user.loginToken, { maxAge: maxAge });
        localStorage.setItem('user', JSON.stringify(user));
        history.push('/');
        return success(user);
    } else{
        return failure(user);
    }
    

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

async function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}