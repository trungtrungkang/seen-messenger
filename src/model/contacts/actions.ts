import ContactService from '../contact-service';
import { CONTACTS } from '../types';
import EventService from '../bus';

let bus = EventService.singleton().cat('model').cat('contacts');

function arrayContactUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i].email === a[j].email)
                a.splice(j--, 1);
        }
    }
    return a;
}

export function loadContacts() {
    return (dispatch) => {
        dispatch(toggleFetchingContacts(true));

        // Load contacts from localStorage first
        var localContacs = null;
        try {
            localContacs = JSON.parse(localStorage.getItem("contacts"));
        } catch (e) {
            console.log(e);
        };
        if (localContacs) {
            dispatch(contactsLoaded(localContacs));
        }

        var service = ContactService.singleton();
        service.getOnlineContacts().then((onlineContacts) => {
            dispatch(toggleFetchingContacts(false));
            dispatch(contactsLoaded(
                localContacs ?
                    arrayContactUnique(onlineContacts.concat(localContacs)) :
                    onlineContacts
            ));
        }).catch((err) => {
            console.error(err);
        }).then(function () {
            dispatch(toggleFetchingContacts(true));
            service.getContacts().then((contacts) => {
                dispatch(toggleFetchingContacts(false));
                dispatch(contactsLoaded(contacts));
            }).catch((err) => {
                dispatch(toggleFetchingContacts(false));
                console.error(err);
            });
        });
    }
}

export function refreshOnlineContacts() {
    return (dispatch) => {
        var service = ContactService.singleton();
        service.updateOnlineContacts().then((contacts) => {
            dispatch(contactsLoaded(contacts));
        }).catch((err) => {
            console.error(err);
        });
    }
}

export function contactsLoaded(contacts) {
    return (dispatch) => {
        dispatch({ type: CONTACTS.CONTACTS_LOADED, data: contacts });
        bus.emit('ContactsLoaded', contacts);
    }
}

export function toggleFetchingContacts(isFetching) {
    return { type: CONTACTS.FETCHING_CONTACTS, data: isFetching };
}

export function toggleWindow(val?: boolean) {
    return { type: CONTACTS.TOGGLE_WINDOW, data: val }
}

export function setFilter(text) {
    return { type: CONTACTS.SET_FILTER, data: text };
}

export function setActive(contact) {
    return { type: CONTACTS.SET_ACTIVE, data: contact };
}

export function addContact(contact){
    return {type: CONTACTS.ADD_CONTACT, data: contact};
}

export function partnerAdded(contact) {
    return { type: CONTACTS.PARTNER_ADDED, data: contact };
}

export function partnerRemoved(user_id) {
    return { type: CONTACTS.PARTNER_REMOVED, data: user_id };
}

export function partnerUpdated(data) {
    return { type: CONTACTS.PARTNER_UPDATED, data: data };
}