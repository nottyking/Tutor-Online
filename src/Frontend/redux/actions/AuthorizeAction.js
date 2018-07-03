import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';
import Cookies from 'universal-cookie';
import { authorizeConstants } from './../constants/AuthorizeConstants';
import capsule from '../../capsulation/SendData'

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const AuthorizeActions = {
    checkValidToken
}

async function checkValidToken() {
    try{
      // console.log(await localStorage.getItem('user'))
      // console.log(await localStorage.getItem('user'));
      const token = JSON.parse(await localStorage.getItem('user')).loginToken;
      const role = JSON.parse(await localStorage.getItem('user')).role;
      var authInfo = (await axios.post(ipList.backend + '/auth' , {loginToken: token , role: role})).data;
      console.log("authInfo:",authInfo);

      if(authInfo.result == "TOKEN NOT MATCH"){
        return await tokenNotMatchRole('...');
      }
      else if(authInfo.result == "ROLE NOT MATCH"){
        return await tokenNotMatchRole('...');
      }
      else{
        return await tokenValid('...');
      }
    } catch(err){
      console.log("Don't have TOKEN");
      /*
        do nothing
      */
    }
    function tokenValid(user) { return { type: authorizeConstants.TOKEN_VALID, user } }
    function tokenLoss(error) { return { type: authorizeConstants.TOKEN_LOSS, error } }
    function tokenNotMatchRole(error) { return { type: authorizeConstants.TOKEN_NOT_MATCH_ROLE, error } }
}
