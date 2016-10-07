import {template, Element, riot} from '../riot-ts';
import EventService from '../../model/bus';
import {IApplicationState, IConversation} from '../../model/types';
import store from '../../model/store';
import * as chatboxActions from '../../model/chatboxes/actions';

import ChatRoomTemplate from './chat-room.html!text';
@template(ChatRoomTemplate)
export default class ChatRoom extends Element {
    private conv:IConversation = null;

    constructor(opts) {
        super();    
    }

    mounted(){
        this.updateMessagePanes();
        store.subscribe(this.onApplicationStateChanged.bind(this));
        
        var $chatRoom = EventService.singleton().cat('chat-room');
        $chatRoom.on('is-visible', () => {
            return (jQuery(this.root).is(':visible'));
        });
    }

    onApplicationStateChanged(){
        this.updateMessagePanes();
        this.update();
    }

    updateMessagePanes(){
        var state = store.getState();
        var activeConv = state.conversationData.conversations.filter((c) => c.isActive)[0];
        if(activeConv && activeConv != this.conv){
            this.hideMessagePane(this.conv);
            this.showMessagePane(activeConv);
            this.conv = activeConv;

            return true;
        }

        return false;
    }

    hideMessagePane(conv:IConversation){
        if(!conv) return;
        var container = this.root.querySelector('.chat-room-container');
        var el = container.querySelector(`div[conv_id="${conv.id}"]`);
        if(el) jQuery(el).hide();
    }

    showMessagePane(conv:IConversation){
        if(!conv) return;
        var container = this.root.querySelector('.chat-room-container');
        var el = container.querySelector(`div[conv_id="${conv.id}"]`);
        if(!el){
            el = document.createElement('div');
            el.setAttribute('conv_id', conv.id);
            el.className = 'message-pane';
            container.appendChild(el);
            riot.mount(el, 'message-pane', {conv: conv});
        }
        else jQuery(el).show();
    }
}