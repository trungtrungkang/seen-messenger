import { template, Element, riot } from '../riot-ts';
import EventService from '../../model/bus';
import * as templates from '../templates/templates';
import emoticonData from './emoticons';

import EmoticonTabTemplate from './emoticon-tab.html!text';

@template(EmoticonTabTemplate)
export default class EmoticonTab extends Element {
    private emoticonTabSwitcher;
    private lastTab: HTMLElement;
    private conv_id;

    public emojiconData;
    public selectEmoticon:(emojicon) => void;

    constructor(opts) {
        super();

        this.conv_id = opts.conv_id;
        this.emojiconData = emoticonData.cats;
    }

    mounted() {
        var emoticonTab = this.root.querySelector('.emoticon-tab-switcher');
        this.emoticonTabSwitcher = UIkit.switcher(jQuery(emoticonTab));
        this.doSwitchTab(0);
    }

    switchTab(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        var target = <HTMLElement>(<any>e.target);
        var cat = (target.getAttribute('cat') || '').toLowerCase();
        var cats = ['unseen', 'people', 'nature', 'objects', 'places', 'symbols'];
        var index = cats.indexOf(cat);
        if (index == -1) return;

        var newTab = target.parentNode;
        if (this.lastTab && this.lastTab != newTab) {
        }
        this.doSwitchTab(index);
    }

    doSwitchTab(index) {
        if(this.emoticonTabSwitcher){
            this.emoticonTabSwitcher.show(index);
        }
    }

    onKeyupSearchInput(e: Event) {
        var input = <HTMLInputElement>(e.target);
        var filterText = input.value.trim();
        this.emojiconData = emoticonData.applyFilter(filterText);
        this.update();
    }

    insertEmojicon(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        var item = (<any>e).item;
        var target = <any>e.target;
        if (target.tagName == "IMG") {
            target = target.parentNode;
        }

        if(this.selectEmoticon) {
            this.selectEmoticon(item.emojicon);
        }

        this.makeRippleEffect(e, target);
    }

    makeRippleEffect(event: MouseEvent, el: HTMLElement) {
        el.classList.add('uk-animation-scale');
        window.setTimeout(function () {
            el.classList.remove('uk-animation-scale');
        }, 500);
    }
}