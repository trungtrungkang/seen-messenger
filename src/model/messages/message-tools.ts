import uuid from '../../common/uuid';
import utils from '../../common/utils';
import LotusService from '../lotus-service';
import store from '../store';
import * as conversationTools from '../conversations/conversation-tools';
import * as contactTools from '../contacts/contact-tools';
import {FILE_TYPES, MESSAGE_TYPE, IMessage} from '../../model/types';

declare var Andaman;

class MessageBase implements IMessage{
    public conv_id;
    public created_time;
    public message_id;
    public sender_id;
    public content;
    public message_type;
    public status = '';

    constructor({conv_id, message_id, sender_id, content, created_time}) {
        this.conv_id = conv_id;
        this.created_time = created_time || utils.get_sending_time();
        this.message_id = message_id || uuid.v1(new Date(this.created_time).valueOf(), null, null);
        this.sender_id = sender_id;
        this.content = content;
    }

    render() {
        return this.content;
    }

    static parse<T extends IMessage>(type: {new(opts): T}, data){
        return new type(data);
    }
}

export class TextMessage extends MessageBase {
    constructor({conv_id, message_id, sender_id, content, created_time}) {
        super({ conv_id, message_id, sender_id, content, created_time });

        this.message_type = 'text';
    }

    static create(conv_id, content) {
        return new Promise((resolve, reject) => {
            var created_time = utils.get_sending_time();

            resolve(new TextMessage({
                conv_id: conv_id,
                message_id: uuid.v1(new Date(created_time).valueOf(), null, null),
                created_time: created_time,
                content: content,
                sender_id: store.getState().userData.user.userId
            }));            
        });
    }
}

export class FileMessage extends MessageBase{
    public content: { name?: string, type?: string, token?: string, file?: File, url?: string, size?:number };

    public progress: number = 0;
    public uploading: boolean;
    public downloading: boolean;
    public done: boolean;//True if uploading or downloading is completed.

    constructor({conv_id, message_id, content, sender_id, created_time}) {
        super({ conv_id, message_id, sender_id, content, created_time });

        this.content = content;
        this.message_type = 'file';
    }

    static upload(file: File, progressCallback, successCallback, errorCallback?) {
        getArrayBuffer(file).then((buffer) => {
            var lotus = LotusService.singleton();
            lotus.ready().then((Lotus) => {
                var data = {
                    body:{
                        file: file
                    }
                };

                Lotus.BlobService.Blob.writeBlob({body: {file}}, buffer, (error, result) => {
                    if (error) {
                        if (errorCallback) errorCallback(error);
                    }
                    else {
                        successCallback(result);
                    }
                }, progressCallback);
            });
        });
    }

    static download(token, progressCallback, successCallback, errorCallback?) {
        var lotus = LotusService.singleton();
        lotus.ready().then((Lotus) => {
            Lotus.readBlob({blobId: token}, (resp) => {
                if (resp.err) {
                    if (errorCallback) errorCallback(resp.err);
                }
                else {debugger;
                    var data = resp.re;
                    var fileInfo = data.file;
                    var file_name = fileInfo.name;
                    var file_type = fileInfo.type;
                    var blob = new Blob([data.result], { type: file_type });
                    var url = URL.createObjectURL(blob);
                    successCallback({ url, blob, fileInfo });
                }
            }, progressCallback);
        });
    }

    static create(conv_id, file: File) {
        return new Promise<FileMessage>((resolve) => {
            var created_time = utils.get_sending_time();
            var receiver_id = conv_id;

            var msg = {
                conv_id: conv_id,
                content: { 
                    file: file, 
                    url: URL.createObjectURL(file), 
                    name: file.name, 
                    size: file.size, 
                    type: file.type 
                },
                created_time: created_time,
                message_id: uuid.v1(new Date(created_time).valueOf(), null, null),
                sender_id: store.getState().userData.user.userId
            };

            resolve(new FileMessage(msg));
        });
    }
}

export class PhotoMessage extends FileMessage{
    constructor({conv_id, message_id, content, sender_id, created_time}){
        super({conv_id, message_id, content, sender_id, created_time});

        this.message_type = 'photo';
    }

    static create(conv_id, file: File) {
        return new Promise<PhotoMessage>((resolve) => {
            var created_time = utils.get_sending_time();
            var receiver_id = conv_id;

            var msg = {
                conv_id: conv_id,
                content: { 
                    file: file, 
                    url: URL.createObjectURL(file), 
                    name: file.name, 
                    size: file.size, 
                    type: file.type 
                },
                created_time: created_time,
                message_id: uuid.v1(new Date(created_time).valueOf(), null, null),
                sender_id: store.getState().userData.user.userId
            };

            resolve(new PhotoMessage(msg));
        });
    }
}

export class VideoMessage extends FileMessage{
    constructor({conv_id, message_id, content, sender_id, created_time}){
        super({conv_id, message_id, content, sender_id, created_time});

        this.message_type = 'video';
    }

    static create(conv_id, file: File) {
        return new Promise<VideoMessage>((resolve) => {
            var created_time = utils.get_sending_time();
            var receiver_id = conv_id;

            var msg = {
                conv_id: conv_id,
                content: { 
                    file: file, 
                    url: URL.createObjectURL(file), 
                    name: file.name, 
                    size: file.size, 
                    type: file.type 
                },
                created_time: created_time,
                message_id: uuid.v1(new Date(created_time).valueOf(), null, null),
                sender_id: store.getState().userData.user.userId
            };

            resolve(new VideoMessage(msg));
        });
    }
}

export class AudioMessage extends FileMessage{
    constructor({conv_id, message_id, content, sender_id, created_time}){
        super({conv_id, message_id, content, sender_id, created_time});

        this.message_type = 'audio';
    }

    static create(conv_id, file: File) {
        return new Promise<AudioMessage>((resolve) => {
            var created_time = utils.get_sending_time();
            var receiver_id = conv_id;

            var msg = {
                conv_id: conv_id,
                content: { 
                    file: file, 
                    url: URL.createObjectURL(file), 
                    name: file.name, 
                    size: file.size, 
                    type: file.type 
                },
                created_time: created_time,
                message_id: uuid.v1(new Date(created_time).valueOf(), null, null),
                sender_id: store.getState().userData.user.userId
            };

            resolve(new AudioMessage(msg));
        });
    }
}

function getArrayBuffer(file) {
    return new Promise<ArrayBuffer>((resolve) => {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            resolve(new Uint8Array(reader.result));
        };

        reader.readAsArrayBuffer(file);
    });
}

export function getMessageFromResponse(resp): MessageBase{
    var data = {
        conv_id: resp.conversationId,
        message_id: resp.messageId,
        sender_id: resp.senderId,
        content: resp.body.content,
        created_time: new Date(resp.time)
    };

    switch(resp.type){
        case MESSAGE_TYPE.FILE:
            return MessageBase.parse<FileMessage>(FileMessage, data);
        case MESSAGE_TYPE.PHOTO_FILE:
            return MessageBase.parse<PhotoMessage>(PhotoMessage, data);
        case MESSAGE_TYPE.VIDEO_FILE:
            return MessageBase.parse<VideoMessage>(VideoMessage, data);
        case MESSAGE_TYPE.AUDIO_FILE:
            return MessageBase.parse<AudioMessage>(AudioMessage, data);
        default:
            return new TextMessage(data);
    }
}

let loadMoreSettings = {};
export function getLoadMoreSettings(conv_id) {
    var settings = loadMoreSettings[conv_id];
    if (!settings) {
        settings = {
            conversationId: conv_id,
            options: {
                messageId: null,
                pageSize: 20
            }
        };

        loadMoreSettings[conv_id] = settings;
    }

    return settings;
}

export function removeLoadMoreSettings(conv_id) {
    delete loadMoreSettings[conv_id];
}

export function insertMessages(msgList: IMessage[], msgs: IMessage[]) {
    var list = [...msgList];
    for (var i = 0, len = msgs.length; i < len; i++) {
        var msg = msgs[i];
        var found = msgList.filter((m) => m.message_id == msg.message_id)[0];
        if (!found) list.push(msg);
    }

    return list.sort((m1, m2) => {
        var d1 = m1.created_time;
        var d2 = m2.created_time;

        if (d1 == d2) return 0;
        return (d1 < d2) ? -1 : 1;
    });
}