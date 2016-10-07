import {Element, template} from '../riot-ts';
import model from '../../model/all';

import LandingPageTemplate from './landing-page.html!text';

import Login from './login';
import SignUp from './signup';

var bus = model.EventService.singleton().cat('components').cat('accounts');

@template(LandingPageTemplate)
export default class LandingPage extends Element{
    mounted(){
        if(model.store.getState().userData.user != null){
            return;
        }
        
        var token = localStorage.getItem('access_token');
        if(token){
            var autoLoginModel = UIkit.modal.blockUI('Auto loggin, please wait...');
            autoLoginModel.show();
            model.users.tools.autoLogin(token).then((resp) => {
                autoLoginModel.hide();

                if (resp.err) {
                    this.setupManual();
                }
                else {
                    model.store.dispatch(model.users.actions.loginSuccess(resp.re.user));
                    model.users.bus.emit('LoginSuccess', resp.re.user);
                }
            });
        }
        else{
            this.setupManual();
        }
    }

    setupManual(){
        bus.on('SwitchToSignUpForm', () => {
            var tag = this.tags['signup-form'] as SignUp;
            tag.showDialog();
        }).on('SwitchToLoginForm', () => {
            var tag = this.tags['login-form'] as Login;
            tag.showDialog();
        });

        bus.emit('SwitchToLoginForm');
    }
}