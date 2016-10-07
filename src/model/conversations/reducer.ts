import {CONVERSATIONS, CHATBOXES, IConversation, IConversationData, IMember} from '../types';

export default function conversationsReducer(state:IConversationData = { conversations: [] }, action) {
    var oldList: IConversation[];
    var newList: IConversation[];

    switch (action.type) {
        case CONVERSATIONS.LOADING_MESSAGES:
            oldList = state.conversations;
            newList = oldList.map((c) => {
                if (c.id == action.data.id){
                    c.isLoadingMessages = action.data.isLoading;
                }

                return c;
            });

            return Object.assign({}, state, { conversations: newList });
        case CONVERSATIONS.TOGGLE_LOADING_CONVERSATIONS:
            return Object.assign({}, state, {isLoading: action.data});
        case CONVERSATIONS.CONVERSATIONS_LOADED:
            var ids = [];
            var cons = <IConversation[]>action.data.conversations;
            newList = cons.filter((c) => {
                if(c && ids.indexOf(c.id) == -1){
                    ids.push(c.id);
                    return true;
                }

                return false;
            });

            return Object.assign({}, state, { conversations: newList });
        case CONVERSATIONS.MARK_AS_READ:
            var id = action.data;
            oldList = state.conversations;
            newList = oldList.map((c) => {
                if (c.id == id) {
                    return Object.assign({}, c, { unread_message_count: 0 });
                }

                return c;
            });
            return Object.assign({}, state, { conversations: newList });
        case CONVERSATIONS.SET_FILTER:
            return Object.assign({}, state, { filter: action.data });
        case CONVERSATIONS.SET_ACTIVE:
            oldList = state.conversations;
            newList = oldList.map((c) => {
                if(c.id == action.data){
                    c.isActive = true;
                    c.unread_message_count = 0;
                    //c.last_active_time = (new Date()).toISOString();
                }
                else{
                    c.isActive = false;
                }

                return c;
            });

            return Object.assign({}, state, { conversations: [...newList] });
        case CONVERSATIONS.UPDATE_UNREAD_MESSAGE_COUNT:
            var id = action.conv_id;
            var count = action.unreadCount;

            oldList = state.conversations;
            newList = oldList.map((c) => {
                if (c.id == id && !c.isActive) {
                    c.unread_message_count = count;
                }

                return c;
            });

            return Object.assign({}, state, { conversations: newList });
        case CONVERSATIONS.ADD_OR_UPDATE:
        case CONVERSATIONS.UPDATE_CONVERSATION:
            var conv = <IConversation>action.data;
            oldList = state.conversations;
            var found = oldList.find((c) => c.id == conv.id);
            if (!found) {
                newList = [conv, ...oldList];
            }
            else {
                newList = oldList.map((c) => {
                    if(c.id == conv.id){
                        var data = {
                            last_message: {
                                created_time: conv.last_message.created_time,
                                id: conv.last_message.id,
                                sender_id: conv.last_message.sender_id,
                                content: conv.last_message.content
                            },
                            unread_message_count: conv.unread_message_count
                        };

                        return Object.assign({}, c, data);
                    }

                    return c;
                });
            }

            return Object.assign({}, state, { conversations: newList });
        case CONVERSATIONS.ADD_OR_UPDATE_ALL:
            var cons = <IConversation[]>action.data;
            oldList = state.conversations;
            newList = [];

            while(cons.length){
                var conv = cons.pop();
                var found = oldList.filter((c) => c.id == conv.id)[0];
                if(!found) newList.push(conv);
                else{
                    var newConv = Object.assign({}, found, {
                        last_message: {
                            created_time: conv.last_message.created_time,
                            id: conv.last_message.id,
                            sender_id: conv.last_message.sender_id,
                            content: conv.last_message.content
                        },
                        unread_message_count: (found.isActive) ? 0 : (found.unread_message_count || 0) + 1
                    });

                    newList.push(newConv);
                }
            }

            return Object.assign({}, state, {conversations: newList});
        case CONVERSATIONS.UPDATE_TITLE:
            var data = action.data;
            var id = data.conv_id;
            var title = data.title;
            
            oldList = state.conversations;
            newList = oldList.map((c) => {
                if(c.id == id){
                    c.title = title;
                }

                return c;
            });

            return Object.assign({}, state, {conversations: newList});
        case CONVERSATIONS.ADD_MEMBERS:
            var members = <IMember[]>action.data.members;
            var conv_id = action.data.conv_id;

            oldList = state.conversations;
            newList = [...oldList];
            var conv = newList.find((c) => c.id == conv_id);
            members.forEach((member) => {
                var found = conv.members.find((m) => m.userId == id);
                if(!found) conv.members.push(member);
            });

            return Object.assign({}, state, {conversations: newList});
        case CONVERSATIONS.CREATE_GROUP:
            var conv = <IConversation>action.data;

            oldList = state.conversations;
            newList = [conv, ...oldList];
            
            return Object.assign({}, state, {conversations: newList});
        default:
            return state;
    }
}