import { template, Element } from '../riot-ts';
import model from '../../model/all';

import UpdateProfileTemplate from './update-profile.html!text';

@template(UpdateProfileTemplate)
export default class UpdateProfile extends Element {
    private modal: UIkit.ModalElement;

    hideDialog() {
        if (this.modal) this.modal.hide();
    }

    showDialog() {
        var el = this.root.querySelector('.uk-modal');
        this.modal = UIkit.modal(jQuery(el));
        this.modal.show();
    }

    onCancelButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.hideDialog();
    }

    onOKButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var userNameField = this.root.querySelector('.account-username') as HTMLInputElement;
        var avatarField = this.root.querySelector('.account-avatar') as HTMLInputElement;
        var profileField = this.root.querySelector('.account-profile') as HTMLInputElement;

        var name = userNameField.value;
        var avatarUrl = avatarField.value;
        var profileUrl = profileField.value;

        model.users.tools.updateProfile({ name, avatarUrl, profileUrl }).then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                model.store.dispatch(model.users.actions.updateProfile({name, avatarUrl, profileUrl}));
                this.hideDialog();
            }
        });
    }
}