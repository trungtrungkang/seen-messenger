import { template, Element } from '../riot-ts';

import store from '../../model/store';
import { IApplicationState, IContact, ISelectableMember } from '../../model/types';
import groupActions from '../../model/groups/actions';

import { ComponentBase } from './component-base';
import * as templates from '../templates/templates';

@template(templates.groups.GroupListPanelTemplate)
export class GroupListPanel extends Element {
    private state: IApplicationState = null;

    public visibleGroups = [];

    constructor(opts) {
        super();

        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged() {
        this.state = store.getState();
        this.visibleGroups = this.getVisibleGroups(this.state);
        this.update();
    }

    getVisibleGroups(state: IApplicationState) {
        var data = state.groupData;
        var groups = data.groups.map(function (c) {
            return c;
        });

        var filter = (data.filter || '').toLowerCase();
        if (filter != '') {
            groups = groups.filter((g) => {
                var name = (g.display_name || '').toLowerCase();
                return name.indexOf(filter) != -1;
            });
        }

        return groups.sort((a, b) => {
            var d1 = new Date(a.join_time);
            var d2 = new Date(b.join_time);

            if (d1 == d2) return 0;
            return (d1 < d2) ? +1 : -1;
        });
    }

    mounted() {
        store.dispatch(groupActions.loadGroups());
    }
}

@template(templates.groups.GroupListTemplate)
export class GroupList extends Element {
    public groups = [];

    constructor(opts) {
        super();

        this.groups = opts.groups;
    }

    onGroupItemClick(event) {
        event.preventDefault();
        event.stopPropagation();

        //var contact = event.item.contact;
        //store.dispatch(contactActions.setActive(contact));
    }
}

@template(templates.groups.GroupSearchTemplate)
export class GroupSearch extends Element {
    keyup(event) {
        var text = event.target.value;
        store.dispatch(groupActions.setFilter(text));
    }
}

@template(templates.groups.GroupDetailPanelTemplate)
export class GroupDetailPanel extends Element {
    public members: ISelectableMember[] = [];
    public contacts: Array<ISelectableMember> = [];
    public errorMessage = "";

    constructor(opts) {
        super();

        this.updateContactList();
    }

    mounted() {
        store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    onApplicationStateChanged() {
        this.updateContactList();
        this.update();
    }

    updateContactList() {
        var state = store.getState();
        var contacts = this.contacts;
        var members = this.members;

        //Add new contacts
        state.contactData.contacts.forEach((c) => {
            var found = contacts.find((cc) => cc.user_id == c.userId);
            if(!found){
                contacts.push({
                    user_id: c.userId,
                    display_name: c.name,
                    selected: false
                });
            }
        });

        //Update selected contacts
        contacts.forEach((c) => {
            var found = members.find((m) => m.user_id == c.user_id);
            c.selected = (found) ? true : false;
        });
    }

    onSelectContactItem(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var contacts = this.contacts;
        var members = this.members;

        var contact = (<any>e).item.contact as ISelectableMember;
        contact.selected = !contact.selected;

        var found = contacts.find((c) => c.user_id == contact.user_id);

        contacts.forEach((c) => {
            var found = members.find((m) => m.user_id == c.user_id);
            if(!found) {
                if(c.selected) members.push(c);
            }
            else{
                if(!c.selected) {
                    var idx = members.indexOf(found);
                    members.splice(idx, 1);
                }
            }
        });

        this.update();
    }

    onCancelButtonClick(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        this.closeNewGroupDialog();
    }

    onCreateButtonClick(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        this.hideError();
        
        var nameField = <HTMLInputElement>this.root.querySelector('.group-name-input');
        var groupName = jQuery.trim(nameField.value);
        if(groupName == ''){
            this.showError('The display name is required.');
            nameField.focus();
            return;
        }

        if(this.members.length == 0){
            this.showError('Please select at least one member.');
            return;
        }

        store.dispatch(groupActions.createGroup(groupName, this.members));
        this.closeNewGroupDialog();
    }

    showError(msg){
        this.errorMessage = msg;
        this.update();
    }

    hideError(){
        this.errorMessage = "";
        this.update();
    }

    closeNewGroupDialog(){
        var $ = jQuery;
        var container = this.root.querySelector('.create-group-button');
        $(container).trigger('click');
    }

    onPreventClosingDialog(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();
    }
}

@template(templates.groups.GroupPanelTemplate)
export class GroupPanel extends Element {
}