import {template, Element} from '../riot-ts';
import {IConversation, MEMBER_TYPE} from '../../model/types';
import model from '../../model/all';

import AddMembersDialog from './add-members-dialog';
import UpdateTitleDialog from './update-title-dialog';
import DeleteConversationDialog from './delete-conversation-dialog';
import LeaveConversationDialog from './leave-conversation-dialog';

import ConversationActionsTemplate from './conversation-actions.html!text';

@template(ConversationActionsTemplate)
export default class ConversationActions extends Element{
    private conv:IConversation;

    constructor(opts){
        super();

        var conv_id = opts.conv_id;
        this.conv = model.store.getState().conversationData.conversations.find((c) => c.id == conv_id);
    }

    isOwner(){
        return this.conv.memberType == MEMBER_TYPE.OWNER;
    }

    onAddMembersButtonClick(e: UIEvent){
        var tag = this.tags['conversation-add-members-dialog'] as AddMembersDialog;
        tag.showDialog(this.conv);
    }

    onDeleteConversationActionItemClick(e: UIEvent){
        var tag = this.tags['conversation-delete-conversation-dialog'] as DeleteConversationDialog;
        tag.showDialog(this.conv);
    }

    onLeaveConversationActionItemClick(e: UIEvent){
        var tag = this.tags['conversation-leave-conversation-dialog'] as LeaveConversationDialog;
        tag.showDialog(this.conv);
    }

    onEditTitleActionItemClick(e: UIEvent){
        var tag = this.tags['conversation-update-title-dialog'] as UpdateTitleDialog;
        tag.showDialog(this.conv);
    }
}