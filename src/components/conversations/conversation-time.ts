import {template, Element} from '../riot-ts';
import model from '../../model/all';
import moment from 'moment';

import ConversationTimeTemplate from './conversation-time.html!text';

let store = model.store;

@template(ConversationTimeTemplate)
export default class ConversationTime extends Element {
    public time = null;

    constructor(opts) {
        super();
        
        this.onUpdate();
        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged(){
        this.onUpdate();
    }

    onUpdate(){
        this.time = moment(this.opts.time).calendar();
        this.update();
    }
}