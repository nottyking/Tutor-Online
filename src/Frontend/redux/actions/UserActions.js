import { history } from '../helpers';
import axios from 'axios'
import ipList from '../../../Config/ipConfig'
import { userConstants } from '../constants/UserConstants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const maxAge = 1 * 31 * 60 * 60;

export const UserActions = {

}