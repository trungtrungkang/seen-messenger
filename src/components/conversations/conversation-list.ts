import {template, Element} from '../riot-ts';
import model from '../../model/all';
import {IConversation, IApplicationState} from '../../model/types';
import ConversationListTemplate from './conversation-list.html!text';

let store = model.store;

@template(ConversationListTemplate)
export default class ConversationList extends Element{
    click(event) {
        event.preventDefault();
        event.stopPropagation();

        var conv:IConversation = event.item.conv;
        store.dispatch(model.conversations.actions.setActiveAndMarkAsRead(conv.id))
    }
}