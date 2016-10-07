import { template, Element } from '../riot-ts';
import * as templates from '../templates/templates';
import store from '../../model/store';
import model from '../../model/all';
import userActions from '../../model/users/actions';
import * as types from '../../model/types';

import SignupForm from './signup.html!text';
var bus = model.EventService.singleton().cat('components').cat('accounts');

@template(SignupForm)
export default class SignUp extends Element {
    private modal: UIkit.ModalElement;

    constructor() {
        super();
    }

    showDialog() {
        var el = this.root.querySelector('.uk-modal');
        this.modal = UIkit.modal(jQuery(el));
        this.modal.show();
    }

    hideDialog() {
        if (this.modal) {
            this.modal.hide();
        }
    }

    onCreateAccountButtonClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        var usernameField = <HTMLInputElement>this.root.querySelector('.login-form-username');
        var emailField = <HTMLInputElement>this.root.querySelector('.login-form-email');
        var passwordField = <HTMLInputElement>this.root.querySelector('.login-form-password');

        var name = usernameField.value;
        var email = emailField.value;
        var password = passwordField.value;

        model.users.tools.signUp(name, email, password).then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                bus.emit('SwitchToLoginForm');
            }
        });

        store.dispatch(userActions.signup(usernameField.value, emailField.value, passwordField.value, (resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                this.hideDialog();
            }
        }));
    }

    onLoginButtonClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        //this.hideDialog();
        bus.emit('SwitchToLoginForm');
    }
}