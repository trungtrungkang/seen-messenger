import {Element, template, riot} from '../riot-ts';
import {FILE_TYPES} from '../../model/types';
import store from '../../model/store';

import * as messageTools from '../../model/messages/message-tools';
import * as messageActions from '../../model/messages/actions';

import PhotoMessageTemplate from './photo-message.html!text';

@template(PhotoMessageTemplate)
export default class PhotoMessage extends Element {
    private fMsg: messageTools.FileMessage = null;
    private blob: Blob;

    public name;
    public size;
    public previewURL;
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
        if (!this.fMsg.content.url && this.fMsg.content.file) {
            this.fMsg.content.url = URL.createObjectURL(this.fMsg.content.file);
        }
        this.previewURL = this.fMsg.content.url;
        this.blob = this.fMsg.content.file;
    }

    mounted() {
        if (!this.fMsg.content.token && this.fMsg.content.file) {
            this.startUploadPhoto();
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
        this.previewURL = this.fMsg.content.url;

        this.update();
    }

    startDownloadPhoto() {
        return new Promise((resolve) => {
            this.onStartDownloading();

            messageTools.FileMessage.download(this.fMsg.content.token, (val) => {
                this.onProgressChange(val);
            }, (result) => {
                this.blob = result.blob;
                this.fMsg.content.url = URL.createObjectURL(this.blob);
                this.onDone();

                resolve();
            });
        });
    }

    startUploadPhoto() {
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
        });
    }

    onDownloadButtonClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.blob) {
            this.startDownloadPhoto().then(() => {
                if(this.blob){
                    FileSaver.saveAs(this.blob, this.fMsg.content.name);
                }
            });
        }
        else {
            FileSaver.saveAs(this.blob, this.fMsg.content.name);
        }
    }

    onPreviewButtonClick(e: Event){
        e.preventDefault();
        e.stopPropagation();

        this.startDownloadPhoto().then(() => {
            if(this.previewURL){
                var el = this.root.querySelector('a[data-uk-lightbox]');
                if(el){
                    var lightbox = UIkit.lightbox(jQuery(el));
                    lightbox.show();
                }
            }
        });
    }

    private formatBytes(bytes: number) {
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return !bytes && '0 Bytes' || (bytes / Math.pow(1024, i)).toFixed(2) + " " + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
    }
}

declare var FileSaver;