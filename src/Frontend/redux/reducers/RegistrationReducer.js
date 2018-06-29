import { userConstants } from '../constants/UserConstants';

export function registration(state={},action){
	switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return { isRegistering: true};
    case userConstants.REGISTER_FAILURE:
      return { isRegistering:false};
    default:
      return state
  }
}