import {MEMBERS} from '../types';
import bus from '../shared/bus';

export function membersLoaded(conv_id, members){
    return (dispatch) => {
        dispatch({type: MEMBERS.MEMBERS_LOADED, data: {conv_id: conv_id, members: members}});
        bus.members.emit(MEMBERS.MEMBERS_LOADED, members);
    };
}

export function addMembers(conv_id, ...memberIds: string[]){
    return (dispatch) => {
        dispatch({type: MEMBERS.ADD_MEMBERS, data: {conv_id, memberIds: memberIds}});
        bus.members.emit(MEMBERS.ADD_MEMBERS, memberIds);
    };
}