import {combineReducers} from 'redux';

import {registration} from './RegistrationReducer';

const rootReducer = combineReducers({
    registration
});

export default rootReducer;