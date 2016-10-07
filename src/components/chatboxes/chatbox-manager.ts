import { template, Element, riot } from '../riot-ts';
import model from '../../model/all';
import { IConversation, IContact, IChatbox, IMessage, CONTACTS, CHATBOXES, CONVERSATIONS } from '../../model/types';

import ChatBoxManagerTemplate from './chatbox-manager.html!text';

let store = model.store;

@template(ChatBoxManagerTemplate)
export default class ChatBoxManager extends Element {
    private firstTime = true;

    public chatboxes = [];
    public dropdownChatboxes = [];

    constructor(opts) {
        super();

        this.onApplicationStateChanged = this.onApplicationStateChanged.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onGroupConversationCreated = this.onGroupConversationCreated.bind(this);
    }

    onApplicationStateChanged() {
        this.updateChatBoxes().then(() => {
            this.update();
            //this.saveCurrentState();
        });
    }

    updateChatBoxes() {
        return new Promise((resolve) => {
            this.isChatRoomVisible().then((visible) => {
                if (visible) {
                    if (this.chatboxes.length) {
                        store.dispatch(model.chatboxes.actions.removeAll());
                    }

                    this.chatboxes = [];
                }
                else {
                    this.chatboxes = store.getState().chatboxData.chatboxes.sort((a, b) => {
                        if (a.last_action_time == b.last_action_time) {
                            return 0;
                        }

                        return (a.last_action_time < b.last_action_time) ? 1 : -1;
                    });
                }

                resolve();
            });
        });
    }

    isChatRoomVisible() {
        return new Promise<boolean>((resolve) => {
            var $chatRoom = model.chatboxes.bus.cat('chat-room');
            $chatRoom.emit('is-visible').then((results) => {
                var visible = (results && results.length) ? results[0] : false;
                resolve(visible);
            });
        });
    }

    mounted() {
        //this.reloadCurrentState();//load states from localstorage if had
        this.updateChatBoxes().then(() => {
            this.update();
        });

        //store.subscribe(this.onApplicationStateChanged.bind(this));
        model.contacts.bus.on(CONTACTS.SELECT_CONTACT, (contact: IContact) => {
            var conv = model.conversations.tools.findOne(contact.userId);
            if (conv) this.openChatBox(conv, true);
            else {
                model.conversations.tools.createOne(contact).then((conv) => {
                    var cons = [...store.getState().conversationData.conversations, conv];
                    store.dispatch(model.conversations.actions.conversationsLoaded(cons));

                    this.openChatBox(conv, true);
                });
            }
        });

        model.chatboxes.bus.on(CHATBOXES.ON_CHANGE, this.onApplicationStateChanged);
        model.conversations.bus
            .on(CONVERSATIONS.CREATE_GROUP, this.onGroupConversationCreated)
            .on(CONVERSATIONS.ADD_MEMBERS, this.onApplicationStateChanged);
        model.LotusService.singleton().on('Message.onMessage', this.onMessage);
    }

    unmounted() {
        model.chatboxes.bus.off(CHATBOXES.ON_CHANGE, this.onApplicationStateChanged);
        model.conversations.bus
            .off(CONVERSATIONS.CREATE_GROUP, this.onGroupConversationCreated)
            .off(CONVERSATIONS.ADD_MEMBERS, this.onApplicationStateChanged);

        model.LotusService.singleton().off('Message.onMessage', this.onMessage);
    }

    onGroupConversationCreated(conv){
        this.openChatBox(conv, true);
    }

    onMessage(resp) {
        if (resp.err) {
            console.error(resp.err);
        }
        else {
            var msg = model.messages.tools.getMessageFromResponse(resp.re.message) as IMessage;

            //create conversation if it doesn't exist yet
            var conv = store.getState().conversationData.conversations.find((c) => c.id == msg.conv_id);
            if(conv) this.openChatBox(conv);
            else{
                model.conversations.tools.getById(msg.conv_id).then((conv) => {
                    var cons = [...store.getState().conversationData.conversations, conv];
                    store.dispatch(model.conversations.actions.conversationsLoaded(cons));
                    
                    this.openChatBox(conv);
                });
            }
        }
    }

    openChatBox(conv: IConversation, active = false) {
        var chatbox = model.chatboxes.tools.findOne(conv.id);
        if (!chatbox) {
            chatbox = model.chatboxes.tools.createOne(conv.id);
            store.dispatch(model.chatboxes.actions.add(chatbox));
        }

        if(active) {
            store.dispatch(model.chatboxes.actions.setActive(conv.id));
        }
        else {
            this.onApplicationStateChanged();
        }
    }
}