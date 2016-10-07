import {Element, template, riot} from '../riot-ts';
import {FILE_TYPES, MESSAGE_TYPE} from '../../model/types';
import store from '../../model/store';
import * as messageTools from '../../model/messages/message-tools';

import './message-types';

import MsgContentTemplate from './msg-content.html!text';

@template(MsgContentTemplate)
export default class MsgContent extends Element {
    public msg;
    public title;

    constructor(opts) {
        super();

        var conv_id = this.opts.conv_id;
        var message_id = this.opts.message_id;
        var state = store.getState();
        this.msg = state.messageData[conv_id].filter((m) => m.message_id == message_id)[0];
        var sender_id = this.msg.sender_id;
        var contact = (state.userData.user.userId == sender_id) ? state.userData.user : state.contactData.contacts.find((c) => c.userId == sender_id);
        if(contact) this.title = contact.name || contact.email;
    }

    mounted() {
        var fmsg = (<any>this.msg) as messageTools.FileMessage;

        var mainEl = this.root.querySelector('.msg-content-main');
        var tagName = 'text-message';

        switch (this.msg.message_type) {
            case MESSAGE_TYPE.TEXT:
                tagName = 'text-message';
                break;
            case MESSAGE_TYPE.FILE:
            case MESSAGE_TYPE.PHOTO_FILE:
            case MESSAGE_TYPE.VIDEO_FILE:
            case MESSAGE_TYPE.AUDIO_FILE:
                var ext = fmsg.content.name.split('.').pop() || '';
                if (FILE_TYPES.typeOf(ext, 'image')) {
                    tagName = 'photo-message';
                }
                else if (FILE_TYPES.typeOf(ext, 'video')) {
                    tagName = 'video-message';
                }
                else if (FILE_TYPES.typeOf(ext, 'audio')) {
                    tagName = 'audio-message';
                }
                else {
                    tagName = 'file-message';
                }
                break;
        }

        var conv_id = this.opts.conv_id;
        var message_id = this.opts.message_id;

        riot.mount(mainEl, tagName, { conv_id, message_id });
    }
}