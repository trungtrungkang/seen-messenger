import { template, Element } from '../riot-ts';
import model from '../../model/all';

import AddFriendTemplate from './add-friend.html!text';

@template(AddFriendTemplate)
export default class AddFriend extends Element {
    private modal: UIkit.ModalElement;

    hideDialog() {
        if (this.modal) this.modal.hide();
    }

    showDialog() {
        this.resetValues();
        
        var el = this.root.querySelector('.uk-modal');
        this.modal = UIkit.modal(jQuery(el));
        this.modal.show();
    }

    resetValues(){
        var emailField = this.root.querySelector('.add-friend-email') as HTMLInputElement;
        emailField.value = '';
    }

    onCancelButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.hideDialog();
    }

    onOKButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var emailField = this.root.querySelector('.add-friend-email') as HTMLInputElement;
        var email = emailField.value;

        model.contacts.tools.addPartner(email).then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                model.store.dispatch(model.users.actions.addFriend(email));
                this.hideDialog();
            }
        });
    }
}