import {userConstants} from '../constants/UserConstants';

let user = localStorage.getItem('user');
if (user) {
	user = securityControl.decryptWithSecretkey(user);
}

const initialState = user ? 
	{userType: user.userType, user} : {userType: 'guest'};

export function editProfile(state=initialState,action){
	switch(action.type){
		case userConstants.EDIT_PROFILE_REQUEST:
			return {
				isEditProfile: true
			};
		case userConstants.EDIT_PROFILE_FAILURE:
			return {};
		case userConstants.EDIT_PROFILE_SUCCESS:
			return {
				user: action.user
			}
		default:
			return state;
	}
}