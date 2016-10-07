import {APPLICATION, IApplicationData} from '../types';

export default function applicationReducer(state: IApplicationData = {state: 'active'}, action){
    switch(action.type){
        case APPLICATION.ACTIVE:
            return Object.assign({}, state, {state: 'active'});
        case APPLICATION.INACTIVE:
            return Object.assign({}, state, {state: 'inactive'});
        case APPLICATION.TOGGLE_LOADING:
            return Object.assign({}, state, {isLoading: action.data});
        case APPLICATION.TOGGLE_CHAT_ROOM:
            return state;
        default:
            return state;
    }
}