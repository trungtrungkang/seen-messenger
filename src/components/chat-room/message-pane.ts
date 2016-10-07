import { template, Element } from '../riot-ts';
import * as utils from '../shared/utils';
import {bind} from '../shared/decko';
import { IConversation, CONVERSATION_TYPE, CONVERSATIONS} from '../../model/types';
import model from '../../model/all';

import ActionToolbar from '../chatboxes/action-toolbar';
import MessageBox from '../chatboxes/message-box';

import MessagePaneTemplate from './message-pane.html!text';

var store = model.store;
var FileMessage = model.messages.tools.FileMessage;
declare var Quill;

@template(MessagePaneTemplate)
export default class MessagePane extends Element {
    public isPressEnterToSend = true;
    private onTrixInitializeDelegate = null;
    private MAX_HEIGHT = 400;
    private conv: IConversation;
    private actionToolbar: ActionToolbar;
    private quill;

    constructor(opts) {
        super();

        this.conv = opts.conv;
        this.actionToolbar = this.tags['action-toolbar'];
        if (this.actionToolbar) {
            this.actionToolbar.selectEmoticon = this.onSelectEmoticon.bind(this);
        }
    }

    onSelectEmoticon(emojicon) {
        var range = this.quill.getSelection();
        if(range){
            var text = ':' + emojicon.name + ':';
            this.quill.insertText(range.index, text);
            this.quill.setSelection(range.index + text.length, 1);
        }
    }

    onApplicationStateChanged() {

    }

    mounted() {
        this.onApplicationStateChanged();
        store.subscribe(this.onApplicationStateChanged.bind(this));

        if (this.conv.isActive) {
            this.loadHistoryForFirstTime();
        }

        this.initQuillEditor();

        model.conversations.bus.on(CONVERSATIONS.UPDATE_TITLE, this.onUpdateTitle);
    }

    unmounted() {
        model.conversations.bus.off(CONVERSATIONS.UPDATE_TITLE, this.onUpdateTitle);
    }

    onUpdateLayout() {

    }

    @bind
    onUpdateTitle(conv_id, title){
        if(this.conv.id == conv_id){
            this.conv.title = title;
            this.update();
        }
    }

    initQuillEditor() {
        var options = {
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block', 'link'],
                    [{ list: 'ordered' }, { list: 'bullet' }]
                ],
                keyboard: {
                    bindings: {
                        custom: {
                            key: 13,
                            handler: this.onQuillEnterPressed.bind(this)
                        }
                    }
                }
            },
            theme: 'snow'
        };

        var container = this.root.querySelector('.post-message-control');
        this.quill = new Quill(container, options);
        //var toolbar = this.quill.getModule('toolbar');
        //toolbar.addHandler('link', this.quillLinkHandler.bind(this));
    }

    onQuillEnterPressed() {
        var el = this.getQuillEditorElement();
        var $editor = jQuery(el);
        var text = $editor.text();
        if (!this.isPressEnterToSend || text == '') {
            if (text == '') {
                this.quill.setText('');
                this.quill.insertText(0, '');
                return false;
            }
        }

        if(!this.isPressEnterToSend) {
            return true;
        }

        return this.onSendButtonClick();
    }

    getQuillEditorElement(){
        return this.root.querySelector('.post-message-control .ql-editor');
    }

    onSendButtonClick() {
        var el = this.getQuillEditorElement();
        var $editor = jQuery(el);
        var html = $editor.html();

        store.dispatch(model.messages.actions.sendTextMessage(this.conv.id, html));
        this.quill.setText('');
        this.quill.insertText(0, '');
        return false;
    }

    togglePressEnterToSend() {
        this.isPressEnterToSend = !this.isPressEnterToSend;
    }

    loadHistoryForFirstTime() {
        var msgBox: MessageBox = this.tags['message-box'];
        if (!msgBox.isLoadedAtFirstTime) {
            msgBox.loadAtFirstTime();
        }
    }

    getAvatarFromConv(conv: IConversation) {
        if (conv.type == CONVERSATION_TYPE.ONE) {
            var p = model.conversations.tools.getPartner(conv);
            return utils.getAvatarUrl(p.userId);
        }

        return utils.defaultGroupAvatar;
    }
}