import {USERS} from '../types';

export default function userReducer(state = {user: null}, action){
    switch(action.type){
        case USERS.LOGIN_SUCCESS:
        case USERS.SSO_LOGIN_SUCCESS:
            return Object.assign({}, state, {user: action.data});
        case USERS.UPDATE_PROFILE:
            var profile = action.data;
            var user = Object.assign({}, state.user, profile);
            return Object.assign({}, state, {user: user});
        default:
            return state;
    }
}