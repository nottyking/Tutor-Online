import {combineReducers} from 'redux';

import {registration} from './RegistrationReducer';
import { authentication } from './LoginReducer';

const rootReducer = combineReducers({
    registration,
    authentication
});

export default rootReducer;