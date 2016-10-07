import store from './store';
import EventService from './bus';
import * as types from './types';

import * as Actions from './actions';

import LotusService from './lotus-service';
import UserService from './user-service';
import ContactService from './contact-service';
import ConversationService from './conversation-service';

import * as ApplicationActions from './application/actions';
import * as ApplicationTools from './application/application-tools';

import * as ChatBoxActions from './chatboxes/actions';
import * as ChatBoxTools from './chatboxes/chatbox-tools';

import * as ContactActions from './contacts/actions';
import * as ContactTools from './contacts/contact-tools';

import * as ConversationActions from './conversations/actions';
import * as ConversationTools from './conversations/conversation-tools';

import * as MessageActions from './messages/actions';
import * as MessageTools from './messages/message-tools';

import UserActions from './users/actions';
import * as UserTools from './users/user-tools';

import * as MemberTools from './members/member-tools';
import * as MemberActions from './members/actions';

let bus = EventService.singleton().cat('model');

const refs = {
    LotusService,
    EventService,
    store,
    types,
    actions: Actions,
    app:{
        actions: ApplicationActions,
        tools: ApplicationTools,
        bus: bus
    },
    chatboxes:{
        actions: ChatBoxActions,
        tools: ChatBoxTools,
        bus: bus.cat('chatboxes')
    },
    contacts: {
        actions: ContactActions,
        tools: ContactTools,
        service: ContactService,
        bus: bus.cat('contacts')
    },
    conversations:{
        actions: ConversationActions,
        tools: ConversationTools,
        service: ConversationService,
        bus: bus.cat('conversations')
    },
    conversationActions:{
        bus: bus.cat('conversation-actions')
    },
    members: {
        tools: MemberTools,
        actions: MemberActions,
        bus: bus.cat('members')
    },
    messages: {
        actions: MessageActions,
        tools: MessageTools,
        bus: bus.cat('messages')
    },
    users:{
        actions: UserActions,
        service: UserService,
        tools: UserTools,
        bus: bus.cat('users')
    }
};

export default refs;
