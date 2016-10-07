import './register-global-resources';
import moment from 'moment';
import * as common from './common/common';

import model from './model/all';
import components from './components/all';

let store = model.store;
let {USERS} = model.types;

model.users.bus.on('LoginSuccess', () => {
    //model.conversations.actions.restoreConversations();

    var user = store.getState().userData.user;
    model.actions.initialize();
    components.registerComponents({ common: common, moment: moment, user: user });
}).on('LoginFailed', () => {
    if (document.location.hostname == "localhost") {
        if (!document.querySelector('login-form')) {
            var el = components.accounts.createElement();
            document.body.appendChild(el);
        }
    }
});

components.mount('develop-tools');
components.mount('landing-page');
//store.dispatch(model.users.actions.ssoLogin());

