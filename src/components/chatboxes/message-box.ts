import { Element, template } from '../riot-ts';
import model from '../../model/all';
import { IConversation, IContact, IMessage, IApplicationState, MESSAGES } from '../../model/types';
import * as utils from '../shared/utils';
import MessageBoxTemplate from './message-box.html!text';

let store = model.store;

@template(MessageBoxTemplate)
export default class MessageBox extends Element {
    private dates = [];
    private needUpdateScroll = false;
    private _isScrolledToBottom?: boolean = null;
    private hasNewMsg = false;

    public isLoadedAtFirstTime = false;
    public conv: IConversation = null;
    public messages: IMessage[] = [];

    constructor(opts) {
        super();

        var state = store.getState();
        var conv_id = opts.conv_id;
        this.conv = state.conversationData.conversations.find((c) => c.id == conv_id);

        this.onNewMessageInserted = this.onNewMessageInserted.bind(this);
        this.onStartSendingMessage = this.onStartSendingMessage.bind(this);
        this.onLoadMessages = this.onLoadMessages.bind(this);
    }

    isOwner(user_id){
        return store.getState().userData.user.userId == user_id;
    }

    isPartner(user_id){
        return !this.isOwner(user_id);
    }

    onNewMessageInserted(msg: IMessage) {
        if (this._isScrolledToBottom === false) {
            this.hasNewMsg = true;
            this.onNewMessageReceived();
        }
        else {
            this.needUpdateScroll = true;
        }

        this.onLoadMessages();
    }

    onStartSendingMessage(){
        this.needUpdateScroll = true;
        this.onLoadMessages();
    }

    onLoadMessages() {
        if (this.conv) {
            var state = store.getState();
            this.messages = (state.messageData[this.conv.id] || []);

            this.update();
        }
    }

    isInNewDate(msg: IMessage) {
        var date = (msg.created_time).toDateString();
        var lastDate = (this.dates.length > 0) ? this.dates[this.dates.length - 1] : null;
        var result = (date != lastDate);
        this.dates.push(date);

        return result;
    }

    scrollToBottom() {
        var view = this.root.querySelector('.message-box-container');
        if (view) {
            jQuery(view).animate({ scrollTop: view.scrollHeight });
        }
    };

    loadMoreHistory(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.conv) {
            store.dispatch(model.messages.actions.loadMore(this.conv.id, false));
        }
    };

    mounted() {
        //store.subscribe(this.onApplicationStateChanged.bind(this));
        var conv_id = this.opts.conv_id;
        if(this.conv) conv_id = this.conv.id;

        if(conv_id){
            var bus = model.conversations.bus.cat(conv_id);
            bus.on(MESSAGES.INSERT_MESSAGE, this.onNewMessageInserted)
                .on(MESSAGES.START_SEND_MESSAGE, this.onStartSendingMessage)
                .on(MESSAGES.SEND_MESSAGE_SUCCESS, this.onLoadMessages)
                .on(MESSAGES.SEND_MESSAGE_FAILED, this.onLoadMessages)
                .on(MESSAGES.LOAD_MORE_MESSAGES_SUCCESS, this.onLoadMessages);
        }
    }

    unmounted(){
        var conv_id = this.opts.conv_id;
        if(this.conv) conv_id = this.conv.id;

        if(conv_id){
            var bus = model.conversations.bus.cat(conv_id);
            bus.off(MESSAGES.INSERT_MESSAGE, this.onNewMessageInserted)
                .off(MESSAGES.START_SEND_MESSAGE, this.onStartSendingMessage)
                .off(MESSAGES.SEND_MESSAGE_SUCCESS, this.onLoadMessages)
                .off(MESSAGES.SEND_MESSAGE_FAILED, this.onLoadMessages)
                .off(MESSAGES.LOAD_MORE_MESSAGES_SUCCESS, this.onLoadMessages);
        }
    }

    updated() {
        if (this.needUpdateScroll) {
            this.needUpdateScroll = false;
            this.scrollToBottom();
        }

        this.checkScrollingToBottom();
    }

    loadAtFirstTime() {
        if (!this.isLoadedAtFirstTime && this.conv) {
            this.isLoadedAtFirstTime = true;
            var state = store.getState();
            this.messages = state.messageData[this.conv.id] || [];

            if (this.messages.length) {
                this.needUpdateScroll = true;
                this.update();
            }
            else {
                store.dispatch(model.messages.actions.loadMore(this.conv.id, true, () => {
                    this.needUpdateScroll = true;
                    this.scrollToBottom();
                }));
            }
        }
    }

    onMessageBoxContainerScroll(e: UIEvent) {
        this.checkScrollingToBottom();
    }

    checkScrollingToBottom() {
        var target = this.root.querySelector('.message-box-container');
        var maxScrollTop = Math.max(0, target.scrollHeight - target.clientHeight);
        var value = (target.scrollTop >= maxScrollTop);
        if (this._isScrolledToBottom != value) {
            this._isScrolledToBottom = value;
            this.onScrollToBottomValueChanged(value);
        }
    }

    isScrolledToBottom() {
        var target = this.root.querySelector('.message-box-container');
        var maxScrollTop = Math.max(0, target.scrollHeight - target.clientHeight);
        var value = (target.scrollTop >= maxScrollTop);
        return value;
    }

    onScrollToBottomValueChanged(value) {
        this.trigger('onScrollToBottomValueChanged', value);
    }

    onNewMessageReceived() {
        this.trigger('onNewMessageReceived');
    }

    avatarUrl(userId){
        return utils.getAvatarUrl(userId);
    }

    displayName(userId){
        return utils.getDisplayName(userId);
    }
}