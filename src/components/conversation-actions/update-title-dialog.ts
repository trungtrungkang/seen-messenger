import {template, Element} from '../riot-ts';
import {IConversation} from '../../model/types';
import model from '../../model/all';

import UpdateTitleDialogTemplate from './update-title-dialog.html!text';

@template(UpdateTitleDialogTemplate)
export default class UpdateTitleDialog extends Element{
    private modal: UIkit.ModalElement;
    public conv: IConversation;

    showDialog(conv: IConversation){
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

    onCancelButtonClick(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        this.modal.hide();
    }

    onOKButtonClick(e: UIEvent){
        e.preventDefault();
        e.stopPropagation();

        var conv_id = this.conv.id;
        var input = this.root.querySelector('.conversation-name-input-field') as HTMLInputElement;
        var val = jQuery.trim(input.value);

        if(val != '' && val != this.conv.title){
            model.conversations.tools.updateTitle(conv_id, val).then((resp) => {
                if(resp.err) console.error(resp.err);
                else {
                    model.store.dispatch(model.conversations.actions.updateTitle(conv_id, val));
                    this.modal.hide();
                }
            });
        }
        else {
            this.modal.hide();
        }
    }
}