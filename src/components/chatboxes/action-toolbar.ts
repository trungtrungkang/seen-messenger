import {template, Element} from '../riot-ts';
import EventService from '../../model/bus';
import {FILE_TYPES, IConversation} from '../../model/types';
import store from '../../model/store';

import * as messageTools from '../../model/messages/message-tools';
import * as messageActions from '../../model/messages/actions';

import EmoticonTab from './emoticon-tab';

type FileMessage = messageTools.FileMessage;

import ActionToolbarTemplate from './action-toolbar.html!text';

@template(ActionToolbarTemplate)
export default class ActionToolbar extends Element{
    private conv_id;
    private emoticonTab: EmoticonTab;

    public selectEmoticon:(emojicon) => void;

    constructor(opts){
        super();

        this.conv_id = opts.conv_id;
        this.emoticonTab = this.tags['emoticon-tab'];
        this.emoticonTab.selectEmoticon = this.onSelectEmoticon.bind(this);
    }

    onEmoticonButtonClick(e: Event){
        e.preventDefault();
        //e.stopPropagation();
    }

    onSelectFiles(e: Event){
        var target = <HTMLInputElement>e.target;
        var createMsgs = [];
        for(var i = 0; i < target.files.length; i++){
            var file = target.files[i];
            var ext = file.name.split('.').pop() || '';
            var create;
            if (FILE_TYPES.typeOf(ext, 'image')) {
                create = messageTools.PhotoMessage.create;
            }
            else if(FILE_TYPES.typeOf(ext, 'video')){
                create = messageTools.VideoMessage.create;
            } 
            else if(FILE_TYPES.typeOf(ext, 'audio')){
                create = messageTools.AudioMessage.create;
            }
            else {
                create = messageTools.FileMessage.create
            }

            var createMsg = create(this.conv_id, file);
            createMsgs.push(createMsg);
        }

        Promise.all<FileMessage>(createMsgs).then((msgs) => {
            msgs.forEach((m) => {
                store.dispatch(messageActions.startSendingMessage(m));
            });
        });

        //clear files
        jQuery(target).val('');
    }

    onSelectEmoticon(emojicon){
        if(this.selectEmoticon){
            this.selectEmoticon(emojicon);
        }
    }
}