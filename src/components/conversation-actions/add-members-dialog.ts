import { template, Element } from '../riot-ts';
import { IConversation, ISelectableMember } from '../../model/types';
import model from '../../model/all';

import AddMembersDialogTemplate from './add-members-dialog.html!text';

let store = model.store;

@template(AddMembersDialogTemplate)
export default class AddMembersDialog extends Element {
    private modal: UIkit.ModalElement;
    private conv: IConversation;

    public members: ISelectableMember[] = [];
    public contacts: Array<ISelectableMember> = [];
    public errorMessage = "";

    constructor(opts) {
        super();
    }

    mounted() {
        //store.subscribe(this.onApplicationStateChanged.bind(this));
    }

    showDialog(conv: IConversation) {
        this.conv = conv;
        var contactStore = store.getState().contactData.contacts;
        var members = [];
        conv.members.forEach((m) => {
            members.push({ userId: m.userId, name: m.name, selected: true });
        });

        var contacts = [];
        contactStore.forEach((c) => {
            var found = members.find((m) => m.userId == c.userId);
            if (!found) {
                contacts.push({ userId: c.userId, name: c.name, selected: false });
            }
        });

        this.members = members;
        this.contacts = contacts;

        this.update();

        var el = this.root.querySelector('.uk-modal');
        this.modal = UIkit.modal(jQuery(el));
        this.modal.show();
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
            var found = contacts.find((cc) => cc.userId == c.userId);
            if (!found) {
                contacts.push({
                    userId: c.userId,
                    name: c.name,
                    selected: false
                });
            }
        });

        //Update selected contacts
        contacts.forEach((c) => {
            var found = members.find((m) => m.userId == c.userId);
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

        var found = contacts.find((c) => c.userId == contact.userId);

        contacts.forEach((c) => {
            var found = members.find((m) => m.userId == c.userId);
            if (!found) {
                if (c.selected) members.push(c);
            }
            else {
                if (!c.selected) {
                    var idx = members.indexOf(found);
                    members.splice(idx, 1);
                }
            }
        });

        this.update();
    }

    onCancelButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.closeNewGroupDialog();
    }

    onOKButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.hideError();

        if (this.members.length == 0) {
            this.showError('Please select at least one member.');
            return;
        }

        var ids = this.members.map((m) => m.userId);
        if (this.conv.type == 1) {
            model.conversations.tools.addMembers(this.conv.id, ...ids).then((resp) => {
                if (resp.err) {
                    UIkit.modal.alert(resp.err);
                }
                else {
                    store.dispatch(model.conversations.actions.addMembers(this.conv.id, ...ids));
                    this.closeNewGroupDialog();
                }
            });
        }
        else {
            var names = this.members.map((m) => m.name);
            var ids = this.members.map((m) => m.userId);

            names.unshift(store.getState().userData.user.name);
            var title = names.join(', ');

            model.conversations.tools.createGroup(title, ...ids).then((conv) => {
                store.dispatch(model.conversations.actions.createGroup(conv));
                this.closeNewGroupDialog();
            });
        }
    }

    showError(msg) {
        this.errorMessage = msg;
        this.update();
    }

    hideError() {
        this.errorMessage = "";
        this.update();
    }

    closeNewGroupDialog() {
        this.modal.hide();
    }

    onPreventClosingDialog(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();
    }
}