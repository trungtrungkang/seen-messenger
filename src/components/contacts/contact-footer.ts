import {template, Element} from '../riot-ts';
import model from '../../model/all';

import ContactFooterTemplate from './contact-footer.html!text';

@template(ContactFooterTemplate)
export class FriendListSearch extends Element {
    keyup(event) {
        var text = event.target.value;
        model.store.dispatch(model.contacts.actions.setFilter(text));
    }
}