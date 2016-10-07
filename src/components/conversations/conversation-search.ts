import {template, Element} from '../riot-ts';
import model from '../../model/all';

import ConversationSearchTemplate from './conversation-search.html!text';

let store = model.store;

@template(ConversationSearchTemplate)
export default class ConversationSearch extends Element{
    keyup(e: Event){
        e.stopPropagation();
        e.preventDefault();

        var text = (<HTMLInputElement>e.target).value;
        store.dispatch(model.conversations.actions.setFilter(text));
    }
}