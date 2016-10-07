import { template, Element } from '../riot-ts';
import { IConversation } from '../../model/types';
import model from '../../model/all';

import DeleteConversationDialogTemplate from './delete-conversation-dialog.html!text';

@template(DeleteConversationDialogTemplate)
export default class LeaveConversationDialog extends Element {
    private modal: UIkit.ModalElement;
    public conv: IConversation;

    showDialog(conv: IConversation) {
        this.conv = conv;
        this.update();

        var el = this.root.querySelector('.uk-modal');
        this.modal = UIkit.modal(jQuery(el));
        this.modal.show();

        setTimeout(() => {
            var input = this.root.querySelector('.conversation-name-input-field') as HTMLInputElement;
            jQuery(input).focus();
        }, 1000);
    }

    onCancelButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.modal.hide();
    }

    onOKButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        model.conversations.tools.deleteConversation(this.conv.id).then((resp) => {
            if (resp.err) console.error(resp.err);
            else {
                var cons = model.store.getState().conversationData.conversations;
                cons = cons.filter((c) => c.id != this.conv.id);

                model.store.dispatch(model.conversations.actions.conversationsLoaded(cons));
                this.modal.hide();
            }
        });
    }
}