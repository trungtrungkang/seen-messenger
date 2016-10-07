import EventService from '../bus';

let base = EventService.singleton().cat('model');
const all = {
    base: base,
    application: base.cat('application'),
    chatboxes: base.cat('chatboxes'),
    contacts: base.cat('contacts'),
    conversations: base.cat('conversations'),
    conversationActions: base.cat('conversation-actions'),
    messages: base.cat('messages'),
    users: base.cat('users'),
    members: base.cat('members')
}

export default all;