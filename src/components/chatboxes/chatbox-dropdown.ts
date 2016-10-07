import {Element, template} from '../riot-ts';
import store from '../../model/store';
import * as chatboxActions from '../../model/chatboxes/actions';
import {IChatbox} from '../../model/types';

import ChatBoxDropDownTemplate from './chatbox-dropdown.html!text';

@template(ChatBoxDropDownTemplate)
export class ChatBoxDropDown extends Element {
    constructor() {
        super();
    }

    onChatBoxItemClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        var chatbox = (<any>event).item.chatbox;
        store.dispatch(chatboxActions.setActiveAndMoveToTop(chatbox.id));
    }

    getChatBoxTitle(chatbox: IChatbox){
        var conv = store.getState().conversationData.conversations.find((c) => c.id == chatbox.conv_id);
        return conv.title;
    }
}