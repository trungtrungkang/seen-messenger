import {template, Element} from '../riot-ts';

@template('<created-time></created-time>')
export default class CreatedTime extends Element {
    public date: string;

    constructor(opts) {
        super();

        this.date = (new Date(opts.time)).toLocaleDateString();
        this.root.innerHTML = this.date;
    }
}