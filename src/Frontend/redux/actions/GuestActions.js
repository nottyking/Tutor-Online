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

    if (localStorage.getItem('user')) {
        return failure(user);
    }

    const data = {
        usernameEmail,
        password
    }

    var isLoginSuccess = await axios.post(ipList.backend + '/login/normal', {
        usernameOrEmail: data.usernameEmail,
        password: data.password
    }).catch(msg => {
        console.log(msg);
        return failure(msg);
    });

    const user = isLoginSuccess.data;
    if (user.result) {
        cookies.set("loginToken", user.loginToken, { maxAge: maxAge , path: '/' });
        localStorage.setItem('user', JSON.stringify(user));
        return success(user);
    } else {
        return failure(user);
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

async function logout() {
    localStorage.removeItem('user');
    cookies.remove("loginToken",{ path: '/' });
    history.push('/');
    return { type: userConstants.LOGOUT };
}
