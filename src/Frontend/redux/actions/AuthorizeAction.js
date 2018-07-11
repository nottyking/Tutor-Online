import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import Cookies from 'universal-cookie';
import { securityControl } from '../helpers';
import { authorizeConstants } from './../constants/AuthorizeConstants';

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const AuthorizeActions = {
  checkValidToken
}

async function checkValidToken() {
  try {
    const user = await localStorage.getItem('user');

    if (user) {
      //check cookie
      if (!cookies.get("loginToken")) {
        return await tokenLoss('...');
      }

      const decryptUser = securityControl.decryptWithSecretkey(user);
      const token = decryptUser.loginToken;
      const role = decryptUser.role;
      var authInfo = (await axios.post(ipList.backend + '/auth', { loginToken: token, role: role })).data;

      if (authInfo.result == "TOKEN NOT MATCH") {
        return await tokenNotMatchRole('...');
      }
      else if (authInfo.result == "ROLE NOT MATCH") {
        return await tokenNotMatchRole('...');
      }
      else {
        return await tokenValid('...');
      }
    } else {
      if (cookies.get("loginToken")) {
        return await tokenLoss('...');
      } else {
        return await tokenValid('...');
      }
    }
  } catch (err) {
    console.log("Don't have TOKEN");
    /*
      do nothing
    */
  }
  function tokenValid(user) { return { type: authorizeConstants.TOKEN_VALID, user } }
  function tokenLoss(error) { return { type: authorizeConstants.TOKEN_LOSS, error } }
  function tokenNotMatchRole(error) { return { type: authorizeConstants.TOKEN_NOT_MATCH_ROLE, error } }
}
