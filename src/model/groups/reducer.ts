import {GROUPS} from '../types';

const initialState = {
    groups: [], 
    isLoading: false, 
    filter: ''
};

export default function groupReducer(state = initialState, action){
    var type = action.type;
    switch(type){
        case GROUPS.LOAD_GROUPS_SUCCESS:
            var groups = action.data;
            return Object.assign({}, state, {groups: groups});
        case GROUPS.SET_FILTER:
            var filter = action.data;
            return Object.assign({}, state, {filter: filter});
        case GROUPS.CREATE_SUCCESS:
            var group = action.data;
            var oldList = state.groups;
            var newList = [group, ...oldList];
            return Object.assign({}, state, {groups: newList});
        default:
            return state;
    }
}