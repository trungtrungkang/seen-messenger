import { CHATBOXES, MESSAGES, IChatbox } from '../types';
import * as messageTools from '../messages/message-tools';

export default function chatboxesReducer(state = { chatboxes: [] as IChatbox[] }, action) {
    switch (action.type) {
        case CHATBOXES.ADD_CHATBOX:
            //make new collection and push the conv into the list.
            var chatbox = <IChatbox>action.data;
            if (!chatbox) throw Error('The action.data is undefined');

            var found = state.chatboxes.find((c) => c.conv_id == chatbox.conv_id);
            if (!found) {
                var newList = [chatbox, ...state.chatboxes];
                return Object.assign({}, state, { chatboxes: newList });
            }

            return state;
        case CHATBOXES.ADD_ALL:
            var items = <IChatbox[]>action.data || [];
            //validate data
            items.forEach((item) => {
                if (!item) throw Error('The item is undefined.');
            });

            var newList = [...state.chatboxes];
            items.forEach((item) => {
                var found = newList.find((c) => c.conv_id == item.conv_id);
                if (!found) newList.unshift(item);
            });

            return Object.assign({}, state, { chatboxes: newList });
        case CHATBOXES.REMOVE_CHATBOX:
            var conv_id = action.data;

            var newList = state.chatboxes.filter((c) => {
                return c.conv_id != conv_id;
            });

            return Object.assign({}, state, { chatboxes: newList });
        case CHATBOXES.REMOVE_ALL:
            return Object.assign({}, state, {chatboxes: []});
        case CHATBOXES.UPDATE:
            var conv_id = action.data.id;
            var data = action.data.data;

            var oldList = state.chatboxes;
            var newList = oldList.map((c) => {
                if (c.conv_id == conv_id) {
                    Object.assign(c, data);
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: newList });
        case CHATBOXES.SET_ACTIVE:
            var id = action.data;
            var oldList = state.chatboxes;
            var oldActive = oldList.find((c) => c.isActive);
            if(oldActive && oldActive.conv_id == id){
                return state;
            }

            var newList = oldList.map((c) => {
                if (c.conv_id == id) {
                    Object.assign(c, { isMinimized: false, isActive: true, isHidden: false });
                }
                else {
                    c.isActive = false;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: newList });
        case CHATBOXES.MARK_AS_READ:
            var id = action.data;
            var oldList = state.chatboxes;
            var newList = oldList.map((c) => {
                if(c.conv_id == id){
                    c.hasNewMessage = false;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: newList });
        case CHATBOXES.SET_ACTIVE_AND_MOVE_TO_TOP:
            var id = action.data;
            var oldList = state.chatboxes;
            var newList = oldList.map((c) => {
                if(c.conv_id == id){
                    Object.assign(c, { isMinimized: false, isActive: true, isHidden: false, last_action_time: Date.now() });
                }
                else{
                    c.isActive = false;
                }

                return c;
            });
            
            return Object.assign({}, state, {chatboxes: newList});
        case CHATBOXES.HIDE_CHATBOX:
            var chatboxes = state.chatboxes.map((c) => {
                if (c && c.conv_id == action.data) {
                    c.isHidden = true;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case CHATBOXES.SHOW_CHATBOX:
            var chatboxes = state.chatboxes.map((c) => {
                if (c.conv_id == action.data) {
                    c.isHidden = false;
                    c.isMinimized = false;
                    //c.hasNewMessage = false;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case CHATBOXES.TOGGLE_WINDOW:
            var chatboxes = state.chatboxes.map((c) => {
                if (c.conv_id == action.data) {
                    c.isMinimized = !c.isMinimized;
                    //c.hasNewMessage = false;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case CHATBOXES.MINIMIZE:
            var chatboxes = state.chatboxes.map((c) => {
                if (c.conv_id == action.data) {
                    c.isMinimized = true;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case CHATBOXES.MINIMIZE_MANY:
            var ids = <string[]>action.data;
            var oldList = state.chatboxes;
            var newList = oldList.map((c) => {
                var idx = ids.indexOf(c.conv_id);
                if(idx != -1){
                    c.isMinimized = true;
                    ids.splice(idx, 1);
                }

                return c;
            });

            return Object.assign({}, state, {chatboxes: newList});
        case CHATBOXES.MINIMIZE_ALL:
            var chatboxes = state.chatboxes.map((c) => {
                c.isMinimized = true;
                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case CHATBOXES.TOGGLE_LOADING:
            var chatboxes = state.chatboxes.map((c) => {
                if (c.conv_id == action.data.id) {
                    c.isLoading = action.data.isLoading;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        case MESSAGES.INSERT_MESSAGE:
            var conv_id = action.data.conv_id;
            var chatboxes = state.chatboxes.map((c) => {
                if (c.conv_id == conv_id && (c.isMinimized || !c.isActive)) {
                    c.hasNewMessage = true;
                }

                return c;
            });

            return Object.assign({}, state, { chatboxes: chatboxes });
        default:
            return state;
    }
}