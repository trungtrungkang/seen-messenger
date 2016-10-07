import LotusService from '../lotus-service';
import bus from '../shared/bus';

import * as conversationActions from '../conversations/actions';
import * as conversationTools from '../conversations/conversation-tools';

import { MESSAGES, IMessage } from '../types';
import * as messageTools from './message-tools';

export function loadMore(conv_id, reload, successCallback?) {
    return (dispatch) => {
        dispatch(conversationActions.loadingMessages(conv_id, true));
        var lotus = LotusService.singleton();
        lotus.ready().then((Lotus) => {
            var settings = messageTools.getLoadMoreSettings(conv_id);
            if (reload && settings.options.messageId) {
                settings.options.messageId = settings.options.oldMessageId;
            }

            loadHistory(Lotus, settings, (resp) => {
                dispatch(conversationActions.loadingMessages(conv_id, false));

                var err = (resp) ? resp.err : null;
                var messages = (resp && resp.re) ? resp.re.rows : [];
                var options = (resp && resp.re) ? resp.re.options : null;

                if (options) {
                    settings.options.oldMessageId = settings.options.messageId;
                    settings.options.messageId = options.messageId;
                }

                if (!err) {
                    var newList = messages.map((m) => {
                        var msg: IMessage = {
                            conv_id: m.conversationId,
                            message_id: m.messageId,
                            created_time: new Date(m.time),
                            message_type: m.type,
                            sender_id: m.senderId,
                            content: m.body.content,
                            status: ''
                        };

                        return msg;
                    });

                    dispatch(loadMoreSuccess(conv_id, newList, settings));
                    if (successCallback) successCallback();
                }
                else {
                    console.error('Loading more messages failed: ', resp.err);
                    dispatch(loadMoreFailed(conv_id, resp.err));
                }
            });
        });
    };
}

export function loadMoreSuccess(conv_id, messages, settings) {
    return (dispatch) => {
        dispatch({ type: MESSAGES.LOAD_MORE_MESSAGES_SUCCESS, data: { conv_id, messages, settings } });
        bus.conversations.cat(conv_id).emit(MESSAGES.LOAD_MORE_MESSAGES_SUCCESS, messages);
    }
}

export function loadMoreFailed(conv_id, error) {
    return { type: MESSAGES.LOAD_MORE_MESSAGES_FAILED, data: { conv_id, error } };
}

export function sendTextMessage(conv_id, content) {
    return (dispatch) => {
        var lotus = LotusService.singleton();
        lotus.ready().then((Lotus) => {
            messageTools.TextMessage.create(conv_id, content).then((msg: any) => {
                //dispatch START_SEND_MESSAGE to begin sending message.
                //This time the msg may be pushed to history view.
                var message_id = msg.message_id;
                dispatch(startSendingMessage(msg));

                var data = {
                    conversationId: msg.conv_id,
                    preview: 'Text Message',
                    body: {
                        content: msg.content
                    }
                }

                Lotus.ChatService.Message.chat(data, null, (error, result) => {
                    if (error) {
                        //dispatch SEND_MESSAGE_FAILED to update MSG status and notify to user.
                        dispatch(sendMessageFailed(msg, error));
                    }
                    else {
                        //dispatch SEND_MESSAGE_SUCCESS to update MSG status and notify to user.
                        var m = result.message;
                        dispatch(sendMessageSuccess(conv_id, message_id, { message_id: m.message_id, created_time: new Date(m.time) }));
                    }
                });
            });
        });
    };
}

export function sendFileMessage(msg: messageTools.FileMessage) {
    return (dispatch) => {
        var lotus = LotusService.singleton();
        lotus.ready().then((Lotus) => {
            Lotus.messages.send(msg, (resp) => {
                if (resp.err) {
                    //dispatch SEND_MESSAGE_FAILED to update MSG status and notify to user.
                    dispatch(sendMessageFailed(msg, resp.err));
                }
                else {
                    //dispatch SEND_MESSAGE_SUCCESS to update MSG status and notify to user.
                    dispatch(sendMessageSuccess(msg.conv_id, msg.message_id, resp.re));
                }
            });
        });
    };
}

function uploadFile(msg: messageTools.FileMessage) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(startUploadingFile(msg));
            messageTools.FileMessage.upload(msg.content.file, (progress) => {
                var val = parseFloat(progress);
                dispatch(uploadProgress(msg.conv_id, msg.message_id, val));
            }, (result) => {
                dispatch(uploadSuccess(msg.conv_id, msg.message_id, result.token));
                resolve();
            }, (err) => {
                var errorAction = uploadFailed(msg.conv_id, msg.message_id, err);
                dispatch(errorAction);
                reject(err);
            });
        });
    };
}


export function startUploadingFile(msg) {
    return { type: MESSAGES.START_UPLOADING_FILE, data: msg };
}

export function uploadProgress(conv_id, message_id, progressValue) {
    return { type: MESSAGES.UPLOAD_FILE_PROGRESS, data: { conv_id, message_id, progressValue } };
}

function uploadSuccess(conv_id, message_id, token) {
    return { type: MESSAGES.UPLOAD_SUCCESS, data: { conv_id, message_id, token } };
}

function uploadFailed(conv_id, message_id, error) {
    return { type: MESSAGES.UPLOAD_FAILED, data: { conv_id, message_id, error } };
}

export function startSendingMessage(msg: IMessage) {
    return (dispatch) => {
        dispatch({ type: MESSAGES.START_SEND_MESSAGE, data: msg });
        bus.conversations.cat(msg.conv_id).emit(MESSAGES.START_SEND_MESSAGE, msg);
    };
}

export function sendMessageSuccess(conv_id, message_id, data) {
    return (dispatch) => {
        dispatch({
            type: MESSAGES.SEND_MESSAGE_SUCCESS,
            data: { conv_id: conv_id, message_id: message_id, message: data }
        });

        bus.conversations.cat(conv_id).emit(MESSAGES.SEND_MESSAGE_SUCCESS);
    };
}

export function sendMessageFailed(msg: IMessage, err) {
    return (dispatch) => {
        dispatch({ type: MESSAGES.SEND_MESSAGE_FAILED, data: msg, error: err });
        bus.conversations.cat(msg.conv_id).emit(MESSAGES.SEND_MESSAGE_FAILED);
    };
}

export function insertMessage(msg: IMessage) {
    return (dispatch) => {
        dispatch({ type: MESSAGES.INSERT_MESSAGE, data: msg });
        bus.conversations.cat(msg.conv_id).emit(MESSAGES.INSERT_MESSAGE, msg);
    };
}

var loadHistoryRequests = [];
var isLoadingHistory = false;

function loadHistory(Lotus, settings, cb) {
    var busy = loadHistoryRequests.length > 0;
    loadHistoryRequests.push({ settings, cb });

    startLoadingHistory(Lotus);
}

function startLoadingHistory(Lotus) {
    if (isLoadingHistory) return;

    if (loadHistoryRequests.length) {
        isLoadingHistory = true;
        var request = loadHistoryRequests.pop();
        doLoadingHistory(Lotus, request, () => {
            isLoadingHistory = false;
            startLoadingHistory(Lotus);//process next request.
        });
    }
}

function doLoadingHistory(Lotus, request, done) {
    var settings = request.settings;
    var cb = request.cb;

    Lotus.ChatService.Message.getPreviousPage(settings, (error, result) => {
        done();
        cb({ err: error, re: result });
    });
}