import store from '../store';
import {IChatbox, IContact} from '../types';

/**
 * Creates a conversation from user id
 */
export function create(contact: IContact): IChatbox {
    return {
        conv_id: contact.userId,
        created_time: (new Date()).toISOString(),
        partner: contact,
        last_action_time: -1
    };
}

export function getActiveChatbox(): IChatbox {
    var state = store.getState();
    var chatbox = state.chatboxData.chatboxes.filter((c) => c && c.isActive)[0];
    if (chatbox) {
        var conv = state.conversationData.conversations.filter((c) => c.id == chatbox.conv_id)[0];
        if (conv) return chatbox;
    }

    return null;
}

function findOne(conv_id){
    return store.getState().chatboxData.chatboxes.find((c) => c.conv_id == conv_id);
}

function createOne(conv_id): IChatbox{
    return {
        conv_id: conv_id,
        created_time: new Date(),
        last_action_time: new Date()
    };
}

export {findOne, createOne};