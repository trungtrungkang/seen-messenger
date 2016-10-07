import model from '../model/all';
import {riot} from './riot-ts';

import './common/all';
import './accounts/all';
import './chatboxes/all';
import './contacts/all';
import './messages/all';
import './members/all';
import './conversation-actions/all';
import './conversations/all';
import './chat-room/all';
import './developers/all';

function registerComponents(opts) {
    riot.mixin(opts);
    riot.mount('*', opts);
}

function mount(tag, opts){
    riot.mount(tag, opts);
}

const all = {mount, registerComponents};

export default all;