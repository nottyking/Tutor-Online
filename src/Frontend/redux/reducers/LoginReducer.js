import { userConstants } from '../constants/UserConstants';
import { securityControl } from '../helpers';

let user = localStorage.getItem('user');
if (user) {
	user = securityControl.decryptWithSecretkey(user);
}

const initialState = user ?
	{ userType: user.userType, user } : { userType: 'guest' };

export function authentication(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				isLogggingIn: true
			};
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGIN_SUCCESS:
			return {
				user: action.user
			}
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}