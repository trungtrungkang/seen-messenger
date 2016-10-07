import {CONTACTS, IContact, IContactData} from '../types';

export default function contactsReducer(state:IContactData = { contacts: [], isMinimized: false }, action) {
    switch (action.type) {
        case CONTACTS.ADD_CONTACT:
            var contact = <IContact>action.data;
            var found = state.contacts.filter((c) => c.userId == contact.userId)[0];
            if(found) return state;
            var newList = [contact, ...state.contacts];
            return Object.assign({}, state, {contacts: newList});
        case CONTACTS.CONTACTS_LOADED:
            return Object.assign({}, state, { contacts: action.data });
        case CONTACTS.FETCHING_CONTACTS:
            return Object.assign({}, state, { isFetching: action.data });
        case CONTACTS.TOGGLE_WINDOW:
            var isMinimized = !state.isMinimized;
            if (action.data != null) isMinimized = action.data;

            return Object.assign({}, state, { isMinimized: isMinimized });
        case CONTACTS.SET_FILTER:
            return Object.assign({}, state, { filter: action.data });
        case CONTACTS.SET_ACTIVE:
            var user_id = action.data.user_id;
            var contacts = state.contacts.map((c) => {
                c.isActive = (c.userId == user_id);
                return c;
            });

            return Object.assign({}, state, { contacts: contacts });
        case CONTACTS.PARTNER_ADDED:
            var contact = action.data as IContact;
            var oldList = state.contacts;
            var found = oldList.filter((c) => {
                return c.userId == contact.userId;
            })[0];

            if (found) return state;
            var newList = [contact, ...oldList];

            return Object.assign({}, state, { contacts: newList });
        case CONTACTS.PARTNER_REMOVED:
            var user_id = action.data;
            var oldList = state.contacts;
            var newList = oldList.filter((c) => {
                return c.userId != user_id;
            });

            return Object.assign({}, state, { contacts: newList });
        case CONTACTS.PARTNER_UPDATED:
            var email = action.data.email;
            var oldList = state.contacts;
            var newList = oldList.map((c) => {
                if (c.email == email) {
                    return Object.assign({}, c, action.data) as IContact;
                }

                return c;
            });

            return Object.assign({}, state, { contacts: newList });
        default:
            return state;
    }
}