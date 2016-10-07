import store from '../../model/store';
import * as contactActions from '../../model/contacts/actions';
import {APPLICATION} from '../../model/types';

var seenMessengerGlobal = {
    openChatbox(email){
        var contact = store.getState().contactData.contacts.filter((c) => c.email == email)[0];
        if(contact){
            store.dispatch(contactActions.setActive(contact));
        }
    },
    toggleChatRoom(){
        var chatRooms = document.querySelectorAll('chat-room');
        for(var i = 0; i < chatRooms.length; i++){
            var chatRoom = <HTMLElement>chatRooms[i];
            var oldState = chatRoom.style.display;
            chatRoom.style.display = (oldState == 'none') ? '' : 'none';
        }
        
        var action = {type: APPLICATION.TOGGLE_CHAT_ROOM};
        store.dispatch(action);
    },
    getUserInfo(){
        var user = store.getState().userData.user;
        return {
            user_id: user.userId,
            email: user.email,
            display_name: user.name
        };
    },
    logout(){
        localStorage.removeItem('access_token');
        location.reload(true);
    }
};

var global = <any>window;
global.seenMessengerSdk = seenMessengerGlobal;
