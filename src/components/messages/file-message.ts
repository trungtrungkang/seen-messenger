import {Element, template, riot} from '../riot-ts';
import {FILE_TYPES} from '../../model/types';
import store from '../../model/store';

import * as messageTools from '../../model/messages/message-tools';
import * as messageActions from '../../model/messages/actions';

import FileMessageTemplate from './file-message.html!text';

@template(FileMessageTemplate)
export default class FileMessage extends Element {
    private fMsg: messageTools.FileMessage = null;

    public name;
    public size;
    public previewURL = 'uk-icon-file-o';
    public progress = '0%';
    public done = false;
    public token = null;

    public uploading = false;
    public downloading = false;

    constructor(opts) {
        super();

        var conv_id = this.opts.conv_id;
        var message_id = this.opts.message_id;
        var state = store.getState();
        var msg = state.messageData[conv_id].filter((m) => m.message_id == message_id)[0];
        this.fMsg = (<any>msg) as messageTools.FileMessage;
        var content = this.fMsg.content;

        this.name = content.name;
        this.size = this.formatBytes(content.size);
        this.token = content.token;

        this.loadPreview();
    }

    loadPreview() {
        var type = this.name.split('.').pop() || '';
        if (type) type = type.toLowerCase();
        var icon = 'uk-icon-file-o';
        if (FILE_TYPES.typeOf(type, 'pdf')) {
            icon = 'uk-icon-file-pdf-o';
        }
        else if (FILE_TYPES.typeOf(type, 'doc')) {
            icon = 'uk-icon-file-word-o';
        }
        else if (FILE_TYPES.typeOf(type, 'excel')) {
            icon = 'uk-icon-file-excel-o';
        }
        else if (FILE_TYPES.typeOf(type, 'audio')) {
            icon = 'uk-icon-file-sound-o';
        }
        else if (FILE_TYPES.typeOf(type, 'video')) {
            icon = 'uk-icon-file-video-o';
        }
        else if (FILE_TYPES.typeOf(type, 'zip')) {
            icon = 'uk-icon-file-zip-o';
        }
        else if (FILE_TYPES.typeOf(type, 'text')) {
            icon = 'uk-icon-file-text';
        }
        else if (FILE_TYPES.typeOf(type, 'image')) {
            icon = 'uk-icon-file-image-o';
        }

        this.previewURL = icon;
    }

    mounted() {
        if (!this.fMsg.content.token && this.fMsg.content.file) {
            var file = this.fMsg.content.file;
            this.onStartUploading();
            messageTools.FileMessage.upload(file, (progress) => {
                this.onProgressChange(progress);
            }, (resp) => {
                if (!this.fMsg.content.token) {
                    this.fMsg.content.token = resp.token;
                    store.dispatch(messageActions.sendFileMessage(this.fMsg));
                }

                this.onDone();
            })
        }
    }

    onStartUploading() {
        this.progress = '0%';
        this.uploading = true;
        this.downloading = false;
        this.update();
    }

    onStartDownloading() {
        this.progress = '0%';
        this.downloading = true;
        this.uploading = false;
        this.update();
    }

    onProgressChange(value) {
        this.progress = value + '%';
        this.update();
    }

    onDone() {
        this.progress = '0%';
        this.done = true;
        this.uploading = false;
        this.downloading = false;
        this.token = this.fMsg.content.token;

        this.update();
    }

    onDownloadButtonClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        this.done = false;
        this.downloading = true;

        this.onStartDownloading();
        messageTools.FileMessage.download(this.fMsg.content.token, (val) => {
            this.onProgressChange(val);
        }, (result) => {
            this.onDone();
            FileSaver.saveAs(result.blob, this.fMsg.content.name);
        });

        this.update();
    }

    private formatBytes(bytes: number) {
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return !bytes && '0 Bytes' || (bytes / Math.pow(1024, i)).toFixed(2) + " " + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
    }
}

declare var FileSaver;