import {IMemberData, IContact, MEMBERS} from '../types';

export default function memberReducer(state: IMemberData = {}, action){
    var type = action.type;
    var data = action.data;
    var oldList:string[], newList:string[];

    switch(type){
        case MEMBERS.MEMBERS_LOADED:
            var members = data.members as Array<IContact>;
            if (members.length > 0) {
                var conv_id = <string>data.conv_id;
                oldList = state[conv_id] || [];
                newList = members.map((m) => {
                    return m;
                });

                return Object.assign({}, state, { [conv_id]: newList });
            }
            else {
                return state;
            }
        case MEMBERS.ADD_MEMBERS:
            var memberIds = <string[]>data.memberIds;
            var conv_id = <string>data.conv_id;

            oldList = state[conv_id] || [];
            newList = [...oldList];

            memberIds.forEach((id) => {
                var idx = oldList.indexOf(id);
                if(idx == -1) newList.push(id);
            });

            return Object.assign({}, state, {[conv_id]: newList});
        default:
            return state;
    }
}