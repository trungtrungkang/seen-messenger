import { template, Element } from '../riot-ts';
import store from '../../model/store';
import EventService from '../../model/bus';
import { IConversation } from '../../model/types';

import * as messageActions from '../../model/messages/actions';

import PostMessageTemplate from './post-message.html!text';

@template(PostMessageTemplate)
export default class PostMessage extends Element {
    private el;
    private MAX_HEIGHT = 400;
    private isPressEnterToSend = true;
    private onTrixInitializeDelegate;
    private conv_id;

    public conv: IConversation;

    constructor(opts) {
        super();

        this.conv_id = opts.conv_id;
        this.conv = store.getState()
            .conversationData
            .conversations.filter((c) => c.id == opts.conv_id)[0];
    }

    onSelectEmoticon(emojicon){
        var $ = jQuery;
        var input = <HTMLInputElement>this.root.querySelector('input');
        var $input = jQuery(input);

        var cursorPos = input.selectionStart;
        var v = input.value;
        var textBefore = v.substring(0,  cursorPos);
        var textAfter  = v.substring(cursorPos, v.length);
        var data = ':' + emojicon.name + ':';

        $input.val(textBefore + data + textAfter);
        input.selectionStart = input.selectionEnd = cursorPos + data.length;
        $input.focus();
    }

    onInputMessageKeyUp(event: KeyboardEvent) {
        if (event.keyCode == 13 || event.which == 13) {
            event.preventDefault();
            event.stopPropagation();

            var input = <HTMLInputElement>event.target;
            var content = jQuery.trim(input.value);
            if (content == '') return;
            store.dispatch(messageActions.sendTextMessage(this.conv_id, content));
            input.value = '';
        }
    }
}