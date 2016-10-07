import {Element, template, riot} from '../riot-ts';
import store from '../../model/store';

import TextMessageTemplate from './text-message.html!text';

@template(TextMessageTemplate)
export default class TextMessage extends Element {
    mounted() {
        var conv_id = this.opts.conv_id;
        var message_id = this.opts.message_id;
        var state = store.getState();
        var msg = state.messageData[conv_id].filter((m) => m.message_id == message_id)[0];
        var html = msg.content;
        var tmp = jQuery('<div/>').html(html)[0];
        linkifyElement(tmp);

        emojify.run(tmp);
        html = jQuery(tmp).html();
        this.root.innerHTML = html;

        this.update();
    }
}

declare var linkifyElement, emojify;