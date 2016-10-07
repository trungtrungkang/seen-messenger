import {template, Element} from '../riot-ts';
import * as utils from '../shared/utils';
import model from '../../model/all';
import {IConversation, IApplicationState, CONVERSATION_TYPE} from '../../model/types';
import ConversationItemTemplate from './conversation-item.html!text';

let store = model.store;

@template(ConversationItemTemplate)
export default class ConversationItem extends Element{
    conv: IConversation;

    avatarURL:string;
    title: string;
    content: string;
    sender: string;
    unreadCount: number;
    time: Date;

    constructor(opts){
        super();

        this.conv = opts.conv;
        this.onUpdate();

        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged(){
        this.onUpdate();
        this.update();
    }

    onUpdate(){
        var owner = store.getState().userData.user;

        this.avatarURL = utils.defaultGroupAvatar;
        if(this.conv.type == CONVERSATION_TYPE.ONE) {
            var partner = model.conversations.tools.getPartner(this.conv);
            this.avatarURL = utils.getAvatarUrl(partner.userId);
        }

        this.title = this.conv.title;
        this.unreadCount = this.conv.unread_message_count;
        this.time = this.conv.last_message.created_time;
        
        this.content = this.htmlToPlainText(this.conv.last_message.content);
        var senderId = this.conv.last_message.sender_id;
        var senderIsOwner = (senderId == owner.userId);
        this.sender = (senderIsOwner) ? 'You' : utils.getDisplayName(senderId);
    }

    htmlToPlainText(html){
        var text = jQuery('<div/>').html(html).text();
        text = (text.trim) ? text.trim() : text;

        try{
            var contentOBJ = JSON.parse(text);
            if(contentOBJ && contentOBJ.name){
                return contentOBJ.name;
            }
        }catch(ex){
        }

        return text;
    }
}