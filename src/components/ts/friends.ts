import {template, Element} from '../riot-ts';

import store from '../../model/store';
import {IApplicationState} from '../../model/types';
import * as contactActions from '../../model/contacts/actions';

import {ComponentBase} from './component-base';
import * as templates from '../templates/templates';

declare var jQuery;

@template(templates.friends.FriendListPanelTemplate)
export class FriendListPanel extends ComponentBase {
    private state: IApplicationState = null;

    public visibleContacts = [];

    constructor(opts) {
        super();

        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged() {
        this.saveCurrentState();
        this.state = store.getState();
        this.visibleContacts = this.getVisibleContacts(this.state);
        this.update();
    }

    private sortContacts(a, b) {
        var cmp_status;
        if (a.is_online === b.is_online) cmp_status = 0;
        else if (a.is_online) cmp_status = -1;
        else cmp_status = 1;

        var name1 = (a.display_name || '').toLowerCase(),
            name2 = (b.display_name || '').toLowerCase();

        return cmp_status || name1.localeCompare(name2);
    }

    getVisibleContacts(state: IApplicationState) {
        var data = state.contactData;
        var contacts = data.contacts.map(function (c) {
            return c;
        });

        var filter = (data.filter || '').toLowerCase();

        if (filter == '')
            return contacts.sort(this.sortContacts).slice(0, 200);

        var contacts = contacts.filter(function (c) {
            return (c.name || '').toLowerCase().indexOf(filter) != -1;
        });

        return contacts.sort(this.sortContacts).slice(0, 200);
    }

    mounted() {
        this.reloadCurrentState();
        store.dispatch(contactActions.loadContacts());

        var that = this;
        setInterval(function() {
            if (!document.hidden) {
                store.dispatch(contactActions.refreshOnlineContacts());
            }
        }, 30000); // refresh
    }

    saveCurrentState() {
        var state = store.getState();
        var isMinimized = state.contactData.isMinimized;

        localStorage.setItem('seen-messenger.contacts-panel.state', JSON.stringify({ isMinimized: isMinimized }));
    }

    reloadCurrentState() {
        var data = localStorage.getItem('seen-messenger.contacts-panel.state');
        if (data) {
            var contactData: { isMinimized: boolean } = { isMinimized: false };
            try {
                contactData = JSON.parse(data);
            } catch (err) {
                console.error(err);
                localStorage.setItem('seen-messenger.contacts-panel.state', JSON.stringify(contactData));
            }

            store.dispatch(contactActions.toggleWindow(contactData.isMinimized));

            return true;
        }

        return false;
    }
}

@template(templates.friends.FriendListHeaderTemplate)
export class FriendListHeader extends Element {
    public onlineContacts: any[] = [];

    constructor(opts) {
        super();
        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged() {
        var contacts: any[] = (this.opts.contacts || []);
        this.onlineContacts = contacts.filter((c) => c.is_online);
        this.update();
    }

    onHeaderClicked(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        store.dispatch(contactActions.toggleWindow())
    }
}

@template(templates.friends.FriendListTemplate)
export class FriendList extends Element {
    public contacts = [];

    constructor(opts) {
        super();

        this.contacts = opts.contacts;
    }

    click(event) {
        event.preventDefault();
        event.stopPropagation();

        var contact = event.item.contact;
        store.dispatch(contactActions.setActive(contact));
    }
}

@template(templates.friends.FriendListSearchTemplate)
export class FriendListSearch extends Element {
    keyup(event) {
        var text = event.target.value;
        store.dispatch(contactActions.setFilter(text));
    }
}