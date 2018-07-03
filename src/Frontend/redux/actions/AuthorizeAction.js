import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';
import Cookies from 'universal-cookie';
import { authorizeConstants } from './../constants/AuthorizeConstants';

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const AuthorizeActions = {
    checkValidToken
}

async function checkValidToken() {

    if(true){
        return await tokenValid('...');
    }else if(false){
        return await tokenLoss('...');
    }else {
        return await tokenNotMatchRole('...');
    }

    function tokenValid(user) { return { type: authorizeConstants.TOKEN_VALID, user } }
    function tokenLoss(error) { return { type: authorizeConstants.TOKEN_LOSS, error } }
    function tokenNotMatchRole(error) { return { type: authorizeConstants.TOKEN_NOT_MATCH_ROLE, error } }
}