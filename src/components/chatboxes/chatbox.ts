import {riot, Element, template } from '../riot-ts';
import model from '../../model/all';
import { IChatbox, IContact, IConversation, CHATBOXES, MEMBERS, CONVERSATIONS } from '../../model/types';
import * as utils from '../shared/utils';

import ActionToolbar from './action-toolbar';
import MessageBox from './message-box';
import PostMessage from './post-message';

import {UpdateTitleDialog, AddMembersDialog} from '../conversation-actions/all';

import ChatBoxTemplate from './chatbox.html!text';

let store = model.store;

@template(ChatBoxTemplate)
export class ChatBox extends Element {
    private actionToolbar: ActionToolbar;
    private bodySwitcher;

    public chatbox: IChatbox = null;
    public isScrolledToBottom = false;
    public hasNewMessage = false;
    public avatarURL = null;
    public profileURL = null;
    public conv: IConversation = null;

    constructor(opts) {
        super();

        this.actionToolbar = this.tags['action-toolbar'];
        if (this.actionToolbar) {
            this.actionToolbar.selectEmoticon = this.onSelectEmoticon.bind(this);
        }

        this.chatbox = opts.chatbox;
        this.conv = store.getState().conversationData.conversations.find((c) => c.id == this.chatbox.conv_id);

        this.onMemberListClosed = this.onMemberListClosed.bind(this);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
    }

    onSelectEmoticon(emojicon) {
        var postMsg: PostMessage = this.tags['post-message'];
        if (postMsg.onSelectEmoticon) {
            postMsg.onSelectEmoticon(emojicon);
        }
    }

    onMinimizeButtonClick(e: UIEvent){
        store.dispatch(model.chatboxes.actions.minimize(this.chatbox.conv_id));
    }

    toggleWindow(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.chatbox.isMinimized && this.chatbox.hasNewMessage) {
            this.hasNewMessage = true;
        }

        store.dispatch(model.chatboxes.actions.toggleWindow(this.chatbox.conv_id));

        var found = store.getState().chatboxData.chatboxes.find((c) => c.conv_id == this.chatbox.conv_id);
        if (found && !found.isMinimized) {
            this.loadHistoryForFirstTime();
            this.update();
        }
    };

    getMessageBox(): MessageBox {
        return this.tags['message-box'] as MessageBox;
    }

    setEditorFocus() {
        setTimeout(() => {
            var el = this.root.querySelector('.text-msg-input');
            jQuery(el).focus();
        }, 1000);
    };

    closeWindow(event) {
        event.preventDefault();
        event.stopPropagation();

        store.dispatch(model.chatboxes.actions.remove(this.chatbox.conv_id));
    };

    mounted() {
        if (!this.chatbox.isMinimized) {
            setTimeout(() => {
                var container = this.root.querySelector('.chatbox-container');
                if (this.isVisible(container)) {
                    this.loadHistoryForFirstTime();
                }
                else {
                    store.dispatch(model.chatboxes.actions.minimize(this.chatbox.conv_id));
                }
            }, 1000);
        }

        var bodySwicherEl = this.root.querySelector('.chatbox-body-switcher');
        this.bodySwitcher = UIkit.switcher(jQuery(bodySwicherEl));

        var msgBox = this.tags['message-box'] as MessageBox;
        msgBox.on('onScrollToBottomValueChanged', this.onScrollToBottomValueChanged.bind(this));
        msgBox.on('onNewMessageReceived', this.onNewMessageReceived.bind(this));

        var clickDelegate = $.proxy(this.onChatBoxClick, this);
        $(this.root).on('click focusin', clickDelegate);

        //store.subscribe(this.onApplicationStateChanged.bind(this));
        model.chatboxes.bus.on(CHATBOXES.SET_ACTIVE, (id) => {
            if (id == this.chatbox.conv_id) {
                this.setEditorFocus();
            }
        });

        model.members.bus.on(MEMBERS.CLOSE_FORM, this.onMemberListClosed);
        model.conversations.bus.on(CONVERSATIONS.UPDATE_TITLE, this.onUpdateTitle);
    }

    unmounted() {
        var msgBox = this.tags['message-box'] as MessageBox;
        if(msgBox){
            msgBox.off('onScrollToBottomValueChanged');
            msgBox.off('onNewMessageReceived');
        }

        var $ = jQuery;
        $(this.root).off('click focusin', this.onChatBoxClick);

        model.members.bus.off(MEMBERS.CLOSE_FORM, this.onMemberListClosed);
        model.chatboxes.bus.off(CHATBOXES.SET_ACTIVE);
        model.conversations.bus.off(CONVERSATIONS.UPDATE_TITLE, this.onUpdateTitle);
    }

    onUpdateTitle(){
        this.conv = store.getState().conversationData.conversations.find((c) => c.id == this.chatbox.conv_id);
        this.update();
    }

    // updated(){
    //     if(this.chatbox.isActive) {
    //         var el = this.root.querySelector('.text-msg-input');
    //         if(document.activeElement != el){
    //             this.setEditorFocus();
    //         }
    //     }
    // }

    isVisible(element) {
        var $ = jQuery;
        var $win = $(window);
        var $el = $(element);

        var viewport = {
            top: $win.scrollTop(),
            left: $win.scrollLeft(),
            right: null,
            bottom: null
        };
        viewport.right = viewport.left + $win.width();
        viewport.bottom = viewport.top + $win.height();

        var bounds = <any>$el.offset();
        bounds.right = bounds.left + $el.outerWidth();
        bounds.bottom = bounds.top + $el.outerHeight();

        var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        return visible;
    }

    loadHistoryForFirstTime() {
        var msgBox: MessageBox = this.tags['message-box'];
        if (!msgBox.isLoadedAtFirstTime) {
            msgBox.loadAtFirstTime();
        }
    }

    onChatBoxClick(e) {
        if (!this.chatbox.isActive) {
            store.dispatch(model.chatboxes.actions.setActive(this.chatbox.conv_id));
        }
    }

    onScrollToBottomValueChanged(value) {
        if (this.chatbox.isMinimized) return;

        this.isScrolledToBottom = value;
        if (this.isScrolledToBottom) {
            this.hasNewMessage = false;
            store.dispatch(model.chatboxes.actions.markAsRead(this.chatbox.conv_id));
        }
    }

    onNewMessageReceived() {
        this.hasNewMessage = true;
        this.update();
    }

    onNewMsgAlertClick() {
        var msgBox = this.tags['message-box'] as MessageBox;
        if (msgBox) msgBox.scrollToBottom();
    }

    onAddMembersButtonClick(e: UIEvent) {
        //e.preventDefault();
        //e.stopPropagation();

        //this.bodySwitcher.show(1);
        this.addMembersActionItemClick(e);
    }

    onMemberListClosed(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        this.bodySwitcher.show(0);
    }

    editTitleActionItemClick(e: UIEvent){
        var tag = this.tags['conversation-update-title-dialog'] as UpdateTitleDialog;
        tag.showDialog(this.conv);
    }

    addMembersActionItemClick(e: UIEvent){
        var tag = this.tags['conversation-add-members-dialog'] as AddMembersDialog;
        tag.showDialog(this.conv);
    }

    getAvatar(){
        var partner = model.conversations.tools.getPartner(this.conv);
        return utils.getAvatarUrl(partner.userId);
    }

    getTitle(){
        return this.conv.title;
    }

    getProfile(){
        var partner = model.conversations.tools.getPartner(this.conv);
        return utils.getProfileUrl(partner.userId);
    }
}