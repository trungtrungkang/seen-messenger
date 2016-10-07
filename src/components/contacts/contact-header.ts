import {template, Element} from '../riot-ts';
import model from '../../model/all';

import ContactHeaderTemplate from './contact-header.html!text';

@template(ContactHeaderTemplate)
export class ContactHeader extends Element {
    public onlineContacts: any[] = [];

    mounted() {
        model.store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged() {
        var contacts: any[] = (this.opts.contacts || []);
        this.onlineContacts = contacts.filter((c) => c.is_online);
        this.update();
    }

    onHeaderClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        model.store.dispatch(model.contacts.actions.toggleWindow())
    }
}