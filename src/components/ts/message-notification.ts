import EventService from '../../model/bus';
import { template, Element } from '../riot-ts';
import * as utils from '../shared/utils';

import * as applicationActions from '../../model/application/actions';
import * as applicationTools from '../../model/application/application-tools';
import store from '../../model/store';
import * as contactTools from '../../model/contacts/contact-tools';
import * as messageTools from '../../model/messages/message-tools';

/////////////////////////////////////////
// main visibility API function 
// check if current tab is active or not
var vis = (function () {
    var stateKey: any,
        eventKey,
        keys = {
            hidden: "visibilitychange",
            webkitHidden: "webkitvisibilitychange",
            mozHidden: "mozvisibilitychange",
            msHidden: "msvisibilitychange"
        };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function (c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();


/////////////////////////////////////////
// check if current tab is active or not
vis(function () {
    if (vis(null)) {
        onActive();
    } else {
        onInactive();
    }
});

function onActive() {
    store.dispatch(applicationActions.active());
}

function onInactive() {
    store.dispatch(applicationActions.inactive());
}


/////////////////////////////////////////
// check if browser window has focus		
var notIE = (document['documentMode'] === undefined),
    isChromium = window['chrome'];

if (notIE && !isChromium) {
    // checks for Firefox and other  NON IE Chrome versions
    jQuery(window).on("focusin", function () {
        onActive();
    }).on("focusout", function () {
        onInactive();
    });

} else {
    jQuery(window).on('focus', function () {
        onActive();
    }).on('blur', function () {
        onInactive();
    });
}

EventService.singleton().cat('messages').on('receive-new-message', (resp) => {
    // Pass by notifications for messages of myself
    var owner = store.getState().userData.user;
    if (resp.sender_id == owner.userId) return;

    if (!applicationTools.isActive()) {
        //Broser notification
        contactTools.getContactInfo(resp.sender_id).then((contact) => {
            var msg = messageTools.getMessageFromResponse(resp);

            var Push = (<any>window).Push;
            var jQuery = (<any>window).jQuery;
            var title = contact.name;
            var content = '';
            switch (msg.message_type) {
                case 'file':
                    content = msg.content.name;
                    break;
                default:
                    content = jQuery('<div/>').html(msg.content).text();
                    break;
            }

            var avatarURL = utils.resolveUrl(contact.avatarUrl);

            Push.create(title, {
                icon: avatarURL,
                body: content,
                tag: "Seen Messenger",
                timeout: 4000,
                onClick: () => {
                    window.focus();
                    Push.close();
                }
            });
        });
    }
});

function getLastNotificationCode() {
    return localStorage.getItem('seenchat.lastNotificationCode');
}

function setNotificationCode(code) {
    localStorage.setItem('seenchat.lastNotificationCode', code);
}

function getActiveApplication() {
    //ping all seen-chat apps to get their state.
    localStorage.setItem('seenchat.appListStates', '');
    localStorage.setItem('seenchat.queryAppListStates', '');
    localStorage.setItem('seenchat.queryAppListStates', 'true');

    updateApplicationState();

    //check if have any app is active.
    var appListStates = <any[]>JSON.parse(localStorage.getItem('seenchat.appListStates') || '[]');
    for (var i = 0; i < appListStates.length; i++) {
        var app = appListStates[i];
        if (app.state == 'active') {
            return app;
        }
    }

    return null;
}

function updateApplicationState() {
    var appId = applicationTools.appCode;
    var appListStatesValue = localStorage.getItem('seenchat.appListStates');
    var appListStates = JSON.parse(localStorage.getItem('seenchat.appListStates') || '[]');
    var app = appListStates.find((a) => a.id == appId);

    var state = store.getState().applicationData.state;
    if (app) app.state = state;
    else appListStates.push({ id: appId, state: state });

    localStorage.setItem('seenchat.appListStates', JSON.stringify(appListStates));
}

if(window.addEventListener){
    window.addEventListener('storage', (ev) => {
        if (ev.key == 'seenchat.queryAppListStates' && ev.newValue == 'true') {
            updateApplicationState();
        }
    });
}