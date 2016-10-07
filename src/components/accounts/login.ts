import { template, Element } from '../riot-ts';
import model from '../../model/all';

import LoginForm from './login.html!text';

var bus = model.EventService.singleton().cat('components').cat('accounts');

@template(LoginForm)
export default class Login extends Element {
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

    onLoginButtonClick(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        var emailField = <HTMLInputElement>this.root.querySelector('.login-form-email');
        var passwordField = <HTMLInputElement>this.root.querySelector('.login-form-password');

        model.users.tools.signIn(emailField.value, passwordField.value).then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                this.hideDialog();
                //debugger;
                model.store.dispatch(model.users.actions.loginSuccess(resp.re.user));
                model.users.bus.emit('LoginSuccess', resp.re.user);
                localStorage.setItem('access_token', resp.re.idToken);
            }
        });

        model.store.dispatch(model.users.actions.login(emailField.value, passwordField.value, (resp) => {
            if (resp.err) {
                UIkit.modal.alert(resp.err.message);
            }
            else {
                this.hideDialog();
            }
        }));
    }

    onSignUpButtonClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();

        //this.hideDialog();
        bus.emit('SwitchToSignUpForm');
    }
}