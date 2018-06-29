import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';

export const UserActions = {
	register
}

async function register(username, email, password, user_type) {
    const data = {
        username, email, password, user_type
    }

    var isSendSuccess = await axios.post(ipList.backend + '/register', {
        username: data.username, password: data.password, email: data.email,
        fname: '-', lname: '-', address: '-', birthday: '-', gender: '-'
    }).catch(err => {
        console.log(err);
        return failure(err);
    })
    
    const user = isSendSuccess.data
    if (user /*&& user.token*/) {
        localStorage.setItem('user', JSON.stringify('HelloThisIsLocal'));
        console.log('set');
        history.push('/');
        return success(user);
    }

    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}