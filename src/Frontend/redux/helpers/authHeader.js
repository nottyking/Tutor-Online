import { securityControl } from '../helpers'

export function authHeader() {
	const user = localStorage.getItem('user');
	const decryptUser = securityControl.decryptWithSecretkey(user, "userKey");
	if (decryptUser && decryptUser.token) {
		return { 'Authorization': 'JWT ' + user.token };
	} else {
		return {};
	}
}