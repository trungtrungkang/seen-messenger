import {Element, template, riot} from '../riot-ts';
import {FILE_TYPES} from '../../model/types';
import store from '../../model/store';

import * as messageTools from '../../model/messages/message-tools';
import * as messageActions from '../../model/messages/actions';

import VideoMessageTemplate from './video-message.html!text';

@template(VideoMessageTemplate)
export default class VideoMessage extends Element {
    private fMsg: messageTools.FileMessage = null;
    private blob: Blob;

    public name;
    public size;
    public previewURL;
    public progress = '0%';
    public done = false;
    public token = null;
    public type;

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

        if (this.fMsg.content.file && !this.fMsg.content.url) {
            this.fMsg.content.url = URL.createObjectURL(this.fMsg.content.file);
        }
        this.previewURL = this.fMsg.content.url;
        this.type = content.type;
        this.blob = this.fMsg.content.file;
    }

    mounted() {
        if (!this.fMsg.content.token && this.fMsg.content.file) {
            this.startUploadVideo();
        }

        this.initPlayer(false);
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

    startDownloadMediaFile() {
        return new Promise((resolve) => {
            this.onStartDownloading();

            messageTools.FileMessage.download(this.fMsg.content.token, (val) => {
                this.onProgressChange(val);
            }, (result) => {
                this.blob = result.blob;
                this.fMsg.content.url = (result.url) ? result.url : URL.createObjectURL(this.blob);

                this.onDone();
                resolve();
            });
        });
    }

    startUploadVideo() {
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

    onPreviewButtonClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        this.startDownloadMediaFile().then(() => {
            this.initPlayer(true);
        });
    }

    initPlayer(autoPlay) {
        var el = this.root.querySelector('video');
        if (el) {
            var player = plyr.get(el);
            if (!player || !player.length) {
                player = plyr.setup(el)[0];
                if (autoPlay && player && player.play) {
                    player.play();
                }
            }
        }
    }

    onDownloadButtonClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.blob) {
            this.startDownloadMediaFile().then(() => {
                if (this.blob) {
                    this.initPlayer(false);
                    FileSaver.saveAs(this.blob, this.fMsg.content.name);
                }
            });
        }
        else {
            FileSaver.saveAs(this.blob, this.fMsg.content.name);
        }
    }

    private formatBytes(bytes: number) {
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return !bytes && '0 Bytes' || (bytes / Math.pow(1024, i)).toFixed(2) + " " + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i]
    }
}

declare var FileSaver, plyr;