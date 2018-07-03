import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const GuestActions = {
    register,
    login,
    logout
}

async function register(username, email, password, user_type) {
    const data = {
        username, email, password, user_type
    }

    console.log('before get value (Register)');
    var isSendSuccess = await axios.post(ipList.backend + '/register', {
        username: data.username, password: data.password, email: data.email,
        fname: '-', lname: '-', address: '-', birthday: '-', gender: '-'
    }).catch(async (err) => {
        console.log(err);
        return await failure(err);
    })

    const user = isSendSuccess.data
    console.log(user);
    if (user.msg === "Success!") {
        return await success(user);
    }


    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

async function login(usernameEmail, password) {
<<<<<<< HEAD

    if (localStorage.getItem('user')) {
=======
    //check User is loggin-in -> kick
    if(localStorage.getItem('user')) {
>>>>>>> 129fb3ab1a0a76ce256f4438debe850fa03e649e
        return failure(user);
    }

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
        if (user.role == 0) {
            localStorage.setItem('user', JSON.stringify(user));
        } else if (user.role == 1) {
            localStorage.setItem('admin', JSON.stringify(user));
        }
        return success(user);
    } else {
        return failure(user);
    }

<<<<<<< HEAD
=======

>>>>>>> 129fb3ab1a0a76ce256f4438debe850fa03e649e
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

async function logout() {
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
    } else if (localStorage.getItem('admin')) {
        localStorage.removeItem('admin');
    }
    history.push('/');
    return { type: userConstants.LOGOUT };
}
