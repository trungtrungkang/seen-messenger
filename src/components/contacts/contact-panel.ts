import {template, Element} from '../riot-ts';
import {bind} from '../shared/decko';
import {IApplicationState, USERS} from '../../model/types';
import model from '../../model/all';

import ContactPanelTemplate from './contact-panel.html!text';

let store = model.store;

@template(ContactPanelTemplate)
export default class ContactPanel extends Element {
    private state: IApplicationState = null;

    public visibleContacts = [];

    constructor(opts) {
        super();

        this.onApplicationStateChanged = this.onApplicationStateChanged.bind(this);
        model.contacts.bus.on('ContactsLoaded', this.onApplicationStateChanged);
    }

    onApplicationStateChanged() {
        this.saveCurrentState();
        this.state = store.getState();
        this.visibleContacts = this.getVisibleContacts(this.state);
        this.update();
    }

    getVisibleContacts(state: IApplicationState) {
        var data = state.contactData;
        var contacts = data.contacts.map(function (c) {
            return c;
        });

        var filter = (data.filter || '').toLowerCase();
        if (filter == ''){
            return contacts.slice(0, 200);
        }

        contacts = contacts.filter(function (c) {
            return (c.name || '').toLowerCase().indexOf(filter) != -1;
        });

        return contacts;
    }

    mounted() {
        this.reloadCurrentState();

        model.contacts.tools.getContacts().then((resp) => {
            if(!resp.err){
                store.dispatch(model.contacts.actions.contactsLoaded(resp.re.partners));
            }
            else{
                console.error(resp.err);
            }
        });

        model.users.bus.on(USERS.ADD_FRIEND, this.onUserAddFriend);
    }

    unmounted(){
        model.contacts.bus.off('ContactsLoaded', this.onApplicationStateChanged);
        model.users.bus.off(USERS.ADD_FRIEND, this.onUserAddFriend);
    }

    @bind
    onUserAddFriend(email){
        model.contacts.tools.getContacts().then((resp) => {
            if(!resp.err){
                store.dispatch(model.contacts.actions.contactsLoaded(resp.re.partners));
            }
            else{
                console.error(resp.err);
            }
        });
    }

    saveCurrentState() {
        var state = store.getState();
        var isMinimized = state.contactData.isMinimized;

        localStorage.setItem('seen-messenger.contact-panel.state', JSON.stringify({ isMinimized: isMinimized }));
    }

    reloadCurrentState() {
        var data = localStorage.getItem('seen-messenger.contact-panel.state');
        if (data) {
            var contactData: { isMinimized: boolean } = { isMinimized: false };
            try {
                contactData = JSON.parse(data);
            } catch (err) {
                console.error(err);
                localStorage.setItem('seen-messenger.contact-panel.state', JSON.stringify(contactData));
            }

            store.dispatch(model.contacts.actions.toggleWindow(contactData.isMinimized));

            return true;
        }

        return false;
    }
}