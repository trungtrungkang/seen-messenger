import * as redux from 'redux';

import contactReducer from './contacts/reducer';
import conversationReducer from './conversations/reducer';
import chatboxReducer from './chatboxes/reducer';
import messageReducer from './messages/reducer';
import applicationReducer from './application/reducer';
import userReducer from './users/reducer';
import groupReducer from './groups/reducer';
import memberReducer from './members/reducer';

function lastActionReducer(state = null, action) {
    var reduxLogginEnabled = window['scReduxLogginEnabled']
    if(reduxLogginEnabled) console.log(action);
    
    return action;
}

const reducers = redux.combineReducers({
    lastAction: lastActionReducer,
    contactData: contactReducer,
    conversationData: conversationReducer,
    chatboxData: chatboxReducer,
    messageData: messageReducer,
    applicationData: applicationReducer,
    userData: userReducer,
    groupData: groupReducer,
    memberData: memberReducer
});

export default reducers;
