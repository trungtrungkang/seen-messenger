import EventService from '../../model/bus';

let components = EventService.singleton().cat('components');
const all = {
    components,
    accounts: components.cat('accounts'),
    chatboxes: components.cat('chatboxes'),
    contacts: components.cat('contacts'),
    messages: components.cat('messages'),
    conversations: components.cat('conversations')
};

export default all;