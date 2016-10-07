import LotusService from './lotus-service';
import ContactService from './contact-service';
import ConversationService from './conversation-service';
import EventService from './bus';
import UserSerivce from './user-service';

import store from './store';
import { CONTACTS, MESSAGES, IContact, IConversation, CHATBOXES, IMessage } from './types';

import * as chatboxActions from './chatboxes/actions';
import * as conversationActions from './conversations/actions';
import * as messageActions from './messages/actions';
import * as contactActions from './contacts/actions';
import * as applicationActions from './application/actions';

import * as conversationTools from './conversations/conversation-tools';
import * as messageTools from './messages/message-tools';
import * as contactTools from './contacts/contact-tools';
import * as chatboxTools from './chatboxes/chatbox-tools';

//some actions depend on other actions
export function initialize() {
    var lotus = LotusService.singleton();
    var receivedMsgIds = [];
    lotus.on('Message.onMessage', function (resp) {
        var msg = messageTools.getMessageFromResponse(resp.re.message) as IMessage;
        store.dispatch(messageActions.insertMessage(msg));
    });

    lotus.on('contacts.on_partner_added', (resp) => {
        if (resp.err) {
            console.error(resp.err);
            return;
        }

        var owner = store.getState().userData.user;
        var re = resp.re;
        var email = owner.email;
        var contact = (re.partner && re.partner.email == email) ? re.user : re.partner;

        if (contact) {
            store.dispatch(contactActions.partnerAdded(contact));
        }
    });

    lotus.on('contacts.on_partner_removed', (resp) => {
        if (resp.err) {
            console.error(resp.err);
            return;
        }

        var owner = store.getState().userData.user;
        var id = owner.userId;
        var re = resp.re;

        var contact_id = (re.partner_id == id) ? re.user_id : re.partner_id;
        if (contact_id) {
            store.dispatch(contactActions.partnerRemoved(contact_id));
        }
    });

    lotus.on('contacts.on_partner_updated', (resp) => {
        if (resp.err) {
            console.error(resp.err);
            return;
        }

        var owner = store.getState().userData.user;
        var email = owner.email;
        var data = resp.re;

        if (data) {
            store.dispatch(contactActions.partnerUpdated(data));
        }
    });

    lotus.on('users.login_required', () => {
        return new Promise((resolve, reject) => {
            store.dispatch(applicationActions.toggleLoading(true));
            var us = UserSerivce.singleton();
            us.ssoLogin().then(() => {
                store.dispatch(applicationActions.toggleLoading(false));
                resolve();
            }).catch((err) => {
                store.dispatch(applicationActions.toggleLoading(false));
                reject(err);
            });
        });
    });
}