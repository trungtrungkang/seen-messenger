import {Element, template} from '../riot-ts';
import moment from 'moment';

import MsgTimeTemplate from './msg-time.html!text';

@template(MsgTimeTemplate)
export default class MsgTime extends Element {
    public time = null;

    constructor(opts) {
        super();

        this.time = moment(opts.time).format('LT');
    }
}