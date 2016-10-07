import {template, Element} from '../riot-ts';
import {bind} from '../shared/decko';
import model from '../../model/all';
import {IContact, CONTACTS} from '../../model/types';
import * as utils from '../shared/utils';

import ContactBodyTemplate from './contact-body.html!text';

@template(ContactBodyTemplate)
export class ContactBody extends Element {
    public contacts = [];

    mounted() {
        this.contacts = this.opts.contacts;
    }

    click(event) {
        event.preventDefault();
        event.stopPropagation();

        var contact = event.item.contact as IContact;
        model.contacts.bus.emit(CONTACTS.SELECT_CONTACT, contact);
    }

    avatar(url){
        return utils.resolveUrl(url);
    }
}