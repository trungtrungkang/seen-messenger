import {template, Element} from '../riot-ts';
import {IConversation, IContact, MEMBERS} from '../../model/types';
import model from '../../model/all';

import MemberListTemplate from './member-list.html!text';

let store = model.store;

@template(MemberListTemplate)
export default class MemberList extends Element{
    private filterText = '';

    readonly conv:IConversation;
    members: IContact[];
    contacts: IContact[];

    constructor(opts){
        super();

        var conv_id = opts.conv_id;
        this.conv = store.getState().conversationData.conversations.find((c) => c.id == conv_id);

        this.onMembersLoaded = this.onMembersLoaded.bind(this);
    }

    loadMembers(){
        model.members.tools.getMembers(this.conv.id).then((resp) => {
            if(resp.err){
                console.error(resp.err);
            }
            else{
                var ids = resp.re.members.map((m) => m.userId);
                store.dispatch(model.members.actions.membersLoaded(this.conv.id, ids));
            }
        });
    }

    mounted(){
        model.members.bus
            .on(MEMBERS.MEMBERS_LOADED, this.onMembersLoaded)
            .on(MEMBERS.ADD_MEMBERS, this.onMembersLoaded);

        this.loadMembers();
    }

    unmounted(){
        model.members.bus
            .off(MEMBERS.MEMBERS_LOADED, this.onMembersLoaded)
            .off(MEMBERS.ADD_MEMBERS, this.onMembersLoaded);
    }

    onMembersLoaded(){
        var memberIds = store.getState().memberData[this.conv.id];
        this.members = store.getState().contactData.contacts.filter((c) => {
            return memberIds.indexOf(c.userId) != -1;
        });

        this.contacts = this.getContacts();

        this.update();
    }

    getContacts(){
        var members = this.members;
        var filter = jQuery.trim(this.filterText).toLowerCase();

        var contacts = store.getState().contactData.contacts.filter((c) => {
            var found = members.find((m) => m.email == c.email);
            return !found;
        });

        if(filter != ''){
            contacts = contacts.filter((c) => c.name.toLowerCase().indexOf(filter) != -1);
        }

        return contacts;
    }

    onAddMemberButtonClick(e: UIEvent){
        e.preventDefault();
        //e.stopPropagation();

        var contact = (e as any).item.contact as IContact;
        model.members.tools.addMembers(this.conv.id, contact.userId).then((resp) => {
            if(resp.err){
                UIkit.modal.alert(resp.err);
            }
            else{
                store.dispatch(model.members.actions.addMembers(this.conv.id, contact.userId));
            }
        });
    }

    onSearchKeyup(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        this.filterText = (e.target as HTMLInputElement).value;
        this.contacts = this.getContacts();
        this.update();
    }

    onCloseFormButtonClick(e: UIEvent){
        model.members.bus.emit(MEMBERS.CLOSE_FORM, e);
    }
}