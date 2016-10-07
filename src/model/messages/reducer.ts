import {MESSAGES, IMessage, IMessageData} from '../types';
import * as messageTools from './message-tools';

type FileMessage = messageTools.FileMessage;

export default function messagesReducer(state:IMessageData = {}, action) {
    var oldList: Array<IMessage> = null;
    var newList: Array<IMessage> = null;
    var msg: IMessage = null;

    switch (action.type) {
        case MESSAGES.START_SEND_MESSAGE:
            msg = action.data;
            msg.status = "sending";
            var conv_id = msg.conv_id;
            var messages = state[conv_id] || [];

            return Object.assign({}, state, { [conv_id]: [...messages, msg] });
        case MESSAGES.SEND_MESSAGE_SUCCESS:
            var message_id = <string>action.data.message_id;
            msg = action.data.message;
            var conv_id = <string>action.data.conv_id;
            oldList = state[conv_id] || [];
            var found = oldList.filter((m) => m.message_id == message_id)[0];
            if (found) {
                found.message_id = msg.message_id;
                found.created_time = msg.created_time;
                found.status = '';
            }

            return Object.assign({}, state, { [conv_id]: [...oldList] });
        case MESSAGES.SEND_MESSAGE_FAILED:
            var msg = action.data as IMessage;
            var conv_id = msg.conv_id;
            oldList = state[conv_id] || [];
            newList = oldList.map((m) => {
                if (m.message_id == msg.message_id) m.status = 'failed';
                return m;
            });

            return Object.assign({}, state, { [conv_id]: newList });
        case MESSAGES.INSERT_MESSAGE:
            msg = action.data;
            var conv_id = msg.conv_id;

            oldList = state[conv_id] || [];
            newList = messageTools.insertMessages(oldList, [msg]);

            return Object.assign({}, state, { [conv_id]: newList });
        case MESSAGES.LOAD_MORE_MESSAGES_SUCCESS:
            var messages = action.data.messages as Array<IMessage>;
            if (messages.length > 0) {
                var conv_id = <string>action.data.conv_id;

                oldList = state[conv_id] || [];
                newList = messageTools.insertMessages(oldList, messages);

                return Object.assign({}, state, { [conv_id]: newList });
            }
            else {
                return state;
            }
        case MESSAGES.START_UPLOADING_FILE:
            var conv_id = <string>action.data.conv_id;
            var message_id = <string>action.data.message_id;
            var oldList = state[conv_id] || [];
            var newList = oldList.map((m) => {
                if(m.message_id == message_id){
                    var fmsg = (<any>m) as FileMessage;
                    return <IMessage>Object.assign({}, fmsg, {uploading: true});
                }

                return m;
            });

            return Object.assign({}, state, {[conv_id]: newList});
        case MESSAGES.UPLOAD_FILE_PROGRESS:
            var conv_id = <string>action.data.conv_id;
            var message_id = <string>action.data.message_id;
            var progressValue = action.data.progressValue;

            var oldList = state[conv_id] || [];
            var newList = oldList.map((m) => {
                if(m.message_id == message_id){
                    var fmsg = (<any>m) as FileMessage;
                    fmsg.progress = progressValue;
                    return <IMessage>Object.assign({}, m, {progress: progressValue});
                }

                return m;
            });

            return Object.assign({}, state, {[conv_id]: newList});
        case MESSAGES.UPLOAD_SUCCESS:
            var conv_id = <string>action.data.conv_id;
            var message_id = <string>action.data.message_id;
            var progressValue = action.data.progressValue;

            var oldList = state[conv_id] || [];
            var newList = oldList.map((m) => {
                if(m.message_id == message_id){
                    var fmsg = (<any>m) as FileMessage;
                    return <IMessage>Object.assign({}, m, {progress: 100, uploading: false});
                }

                return m;
            });

            return Object.assign({}, state, {[conv_id]: newList});
        default:
            return state;
    }
}