import ConversationService from '../conversation-service';
import LotusService from '../lotus-service';
import store from '../store';
import bus from '../shared/bus';

import { CONVERSATIONS, IConversation, IContact, IMessage } from '../types';
import * as conversationTools from './conversation-tools';

export function addOrUpdateAll(cons: IConversation[]) {
    return { type: CONVERSATIONS.ADD_OR_UPDATE_ALL, data: cons };
}

export function createNewFailed(error) {
    return { type: CONVERSATIONS.CREATE_NEW_FAILED, data: error };
}

export function loadingMessages(id, isLoading) {
    return { type: CONVERSATIONS.LOADING_MESSAGES, data: { id, isLoading } }
}

export function addOrUpdate(conv) {
    return { type: CONVERSATIONS.ADD_OR_UPDATE, data: conv };
}

export function update(conv) {
    return { type: CONVERSATIONS.UPDATE_CONVERSATION, data: conv }
}

export function loadconversations() {
    return (dispatch) => {
        dispatch(toggleLoadingConverstions(true));

        conversationTools.getLastConversations().then((cons) => {
            dispatch(toggleLoadingConverstions(false));
            dispatch(conversationsLoaded(cons));
        }).catch((err) => {
            dispatch(toggleLoadingConverstions(false));
            console.error(err);
        });
    }
}

export function loadConversationsFailed(err) {
    return { type: CONVERSATIONS.LOAD_CONVERSATIONS_FAILED, data: err };
}

export function conversationsLoaded(conversations) {
    return (dispatch) => {
        dispatch({ type: CONVERSATIONS.CONVERSATIONS_LOADED, data: { conversations } });

        bus.conversations.emit(CONVERSATIONS.CONVERSATIONS_LOADED, conversations);
        bus.conversations.emit(CONVERSATIONS.ON_CHANGE);
    };
}

export function toggleLoadingConverstions(isLoading) {
    return { type: CONVERSATIONS.TOGGLE_LOADING_CONVERSATIONS, data: isLoading };
}

export function setFilter(text) {
    return { type: CONVERSATIONS.SET_FILTER, data: text };
}

export function setActiveAndMarkAsRead(conv_id) {
    return (dispatch) => {
        dispatch(setActive(conv_id));
        dispatch(doMarkAsRead(conv_id));
    };
}

export function setActive(conv_id) {
    return { type: CONVERSATIONS.SET_ACTIVE, data: conv_id };
}

export function markAsRead(conv_id) {
    return { type: CONVERSATIONS.MARK_AS_READ, data: conv_id }
}

export function doMarkAsRead(conv_id: string) {
    return (dispatch) => {
        var conv = store.getState()
            .conversationData
            .conversations
            .filter((c) => c.id == conv_id)[0];

        if (conv) {
            var lotus = LotusService.singleton();
            lotus.ready().then((Lotus: any) => {
                var data = {
                    conversationId: conv_id,
                    messageId: conv.last_message.id
                };
                Lotus.ChatService.Message.setReadMessage(data, (error, result) => {
                    if(!error) dispatch(markAsRead(conv.id));
                    else console.error(error);
                });
            });
        }
    };
}

export function restoreConversations() {
    var conversationsData = localStorage.getItem('seen-chat.conversations');
    try {
        var conversations = JSON.parse(conversationsData) || [];
        store.dispatch(conversationsLoaded(conversations));
    } catch (err) {
        localStorage.removeItem('seen-chat.conversations');
        console.error(err);
    }
}

export function updateTitle(conv_id, title: string) {
    return (dispatch) => {
        dispatch({ type: CONVERSATIONS.UPDATE_TITLE, data: { conv_id, title } });

        bus.conversations.emit(CONVERSATIONS.UPDATE_TITLE, conv_id, title);
        bus.conversations.emit(CONVERSATIONS.ON_CHANGE);
    };
}

export function addMembers(conv_id, ...memberIds: string[]) {
    return (dispatch) => {
        dispatch({ type: CONVERSATIONS.ADD_MEMBERS, data: { conv_id, memberIds: memberIds } });

        bus.conversations.emit(CONVERSATIONS.ADD_MEMBERS, memberIds);
        bus.conversations.emit(CONVERSATIONS.ON_CHANGE);
    };
}

export function createGroup(conv) {
    return (dispatch) => {
        dispatch({ type: CONVERSATIONS.CREATE_GROUP, data: conv });

        bus.conversations.emit(CONVERSATIONS.CREATE_GROUP, conv);
        bus.conversations.emit(CONVERSATIONS.ON_CHANGE);
    };
}

bus.conversations.on('ConversationsChanged', () => {
    var conversations = store.getState().conversationData.conversations;
    localStorage.setItem('seen-chat.conversations', JSON.stringify(conversations));
});