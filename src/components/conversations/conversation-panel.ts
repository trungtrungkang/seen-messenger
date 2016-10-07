import { template, Element } from '../riot-ts';
import * as utils from '../shared/utils';
import model from '../../model/all';
import { IConversation, IApplicationState, CONVERSATIONS, IMessage, CONTACTS, IContact, USERS } from '../../model/types';
import { bind } from '../shared/decko';
import ConversationPanelTemplate from './conversation-panel.html!text';

import { UpdateProfile, AddFriend } from '../accounts/all';

let store = model.store;

@template(ConversationPanelTemplate)
export default class ConversationPanel extends Element {
    conversations: IConversation[];

    public state: IApplicationState;
    public user: IContact;

    constructor(opts) {
        super();

        store.subscribe(this.onApplicationStateChanged);
        this.user = store.getState().userData.user;
    }

    mounted() {
        this.loadConversations();

        model.conversations.bus
            .on(CONVERSATIONS.CREATE_GROUP, this.onGroupConversationCreated)
            .on(CONVERSATIONS.ADD_MEMBERS, this.onApplicationStateChanged);

        model.LotusService.singleton().on('Message.onMessage', this.onMessage);
        model.contacts.bus.on(CONTACTS.SELECT_CONTACT, this.onSelectContact);
        model.users.bus.on(USERS.UPDATE_PROFILE, this.onUserUpdateProfile);
    }

    unmounted() {
        model.conversations.bus
            .off(CONVERSATIONS.CREATE_GROUP, this.onGroupConversationCreated)
            .off(CONVERSATIONS.ADD_MEMBERS, this.onApplicationStateChanged);
            
        model.LotusService.singleton().off('Message.onMessage', this.onMessage);
        model.contacts.bus.off(CONTACTS.SELECT_CONTACT, this.onSelectContact);
        model.users.bus.off(USERS.UPDATE_PROFILE, this.onUserUpdateProfile);
    }

    @bind
    onSelectContact(contact: IContact) {
        var conv = model.conversations.tools.findOne(contact.userId);
        if (conv) this.openConversation(conv);
        else {
            model.conversations.tools.createOne(contact).then((conv) => {
                var cons = [...store.getState().conversationData.conversations, conv];
                store.dispatch(model.conversations.actions.conversationsLoaded(cons));

                this.openConversation(conv);
            });
        }
    }

    @bind
    onUserUpdateProfile() {
        this.user = store.getState().userData.user;
        this.update();
    }

    openConversation(conv: IConversation) {
        store.dispatch(model.conversations.actions.setActiveAndMarkAsRead(conv.id));
    }

    @bind
    onGroupConversationCreated(conv) {
        this.openConversation(conv);
    }

    @bind
    onMessage(resp) {
        if (resp.err) {
            console.error(resp.err);
        }
        else {
            var msg = model.messages.tools.getMessageFromResponse(resp.re.message) as IMessage;

            //create conversation if it doesn't exist yet
            var conv = store.getState().conversationData.conversations.find((c) => c.id == msg.conv_id);
            if (!conv) {
                model.conversations.tools.getById(msg.conv_id).then((conv) => {
                    var cons = [...store.getState().conversationData.conversations, conv];
                    store.dispatch(model.conversations.actions.conversationsLoaded(cons));
                });
            }
        }
    }

    @bind
    private onApplicationStateChanged() {
        this.state = store.getState();
        this.conversations = this.getVisibleConversations();
        this.setDefaultActive();
        this.update();
    }

    private loadConversations() {
        store.dispatch(model.conversations.actions.loadconversations());
    }

    private getVisibleConversations() {
        var state = store.getState();
        var conversations = state.conversationData.conversations;
        var filter = (state.conversationData.filter || '').toLowerCase();

        var list = conversations.filter((c) => {
            return (c.title || '').toLowerCase().indexOf(filter) != -1 || (c.last_message.content || '').toLowerCase().indexOf(filter) != -1;
        });

        return model.conversations.tools.sort(list);
    }

    private setDefaultActive() {
        if (this.conversations.length) {
            var conversations = store.getState().conversationData.conversations;
            var activeConv = conversations.find((c) => c.isActive);
            if (!activeConv && conversations.length) {
                var firstConv = this.conversations[0];
                store.dispatch(model.conversations.actions.setActive(firstConv.id));
            }
        }
    }

    getAvatarById(userId) {
        return utils.getAvatarUrl(userId);
    }

    onUpdateProfileActionItemClick(e: UIEvent) {
        var tag = this.tags['account-update-profile'] as UpdateProfile;
        tag.showDialog();
    }

    onAddFriendActionItemClick(e: UIEvent){
        var tag = this.tags['account-add-friend'] as AddFriend;
        tag.showDialog();
    }

    onLogoutActionItemClick(e: UIEvent){
        var logoutModal = UIkit.modal.blockUI('Logging out, please wait...');
        model.users.tools.logOut().then((resp) => {
            logoutModal.hide();
            
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
                console.log(resp.err);
            }
            else {
                setTimeout(() => { window.location.reload(); }, 1000);
            }
        });
    }
}