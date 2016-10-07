import store from '../../model/store';
declare var jQuery;

function setUnreadMsgCount (total) {
    // Update number of total unread messages displayed on Seen.life menu
    jQuery('.joms-js--notiflabel-inbox').text(total || '');
    localStorage.setItem("total_unread_count", total);
    //console.log('total_unread_count', total);
    jQuery('#user_info #total_unread_count').text(total);
}

function updateUnreadMsgCount(){
    var state = store.getState();
    var count = 0;
    state.conversationData.conversations.forEach((conv) => {
        count += conv.unread_message_count;
    });

    setUnreadMsgCount(count);
}

store.subscribe(() => {
    updateUnreadMsgCount();
});

updateUnreadMsgCount();

