import { template, Element } from '../riot-ts';
import model from '../../model/all';
import { IContact } from '../../model/types';

import DevelopToolsTemplate from './tools.html!text';
@template(DevelopToolsTemplate)
export default class DevelopTools extends Element {
    public user: IContact;

    constructor(opts) {
        super();
        this.user = model.store.getState().userData.user;
        model.users.bus.on('LoginSuccess', (usr) => {
            this.user = usr;
            this.update();
        });
    }

    onAddPartnerButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt("Please enter partner email", '', (value) => {
            if (value != '') {
                model.contacts.tools.addPartner(value).then((resp) => {
                    if (resp.err) {
                        UIkit.modal.alert(JSON.stringify(resp.err));
                        console.error(resp.err);
                    }
                    else {
                        UIkit.modal.alert('done.');
                    }
                });
            }
        });
    }

    onSignupButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt("Please enter email", '', (email) => {
            if (email != '') {
                UIkit.modal.prompt("Please enter password", '', (password) => {
                    if (password != '') {
                        var idx = email.indexOf('@');
                        var name = email.substr(0, idx);
                        model.users.tools.signUp(name, email, password).then((resp) => {
                            if (resp.err) {
                                UIkit.modal.alert(JSON.stringify(resp.err));
                                console.error(resp.err);
                            }
                            else {
                                UIkit.modal.alert('done.');
                            }
                        });
                    }
                });
            }
        });
    }

    onLoginButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt("Please enter email", '', (email) => {
            if (email != '') {
                UIkit.modal.prompt("Please enter password", '', (password) => {
                    if (password != '') {
                        var idx = email.indexOf('@');
                        var name = email.substr(0, idx);
                        model.users.tools.signIn(email, password).then((resp) => {
                            if (resp.err) {
                                UIkit.modal.alert(JSON.stringify(resp.err));
                                console.error(resp.err);
                            }
                            else {
                                //debugger;
                                model.store.dispatch(model.users.actions.loginSuccess(resp.re.user));
                                model.users.bus.emit('LoginSuccess', resp.re.user);
                                localStorage.setItem('access_token', resp.re.idToken);
                            }
                        });
                    }
                });
            }
        });
    }

    onAutoLoginButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        var token = localStorage.getItem('access_token');
        if (token == null || token == '') {
            UIkit.modal.alert('There is no token to login.');
            return;
        }

        model.users.tools.autoLogin(token).then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(JSON.stringify(resp.err));
                console.error(resp.err);
            }
            else {
                model.store.dispatch(model.users.actions.loginSuccess(resp.re.user));
                model.users.bus.emit('LoginSuccess', resp.re.user);
            }
        });
    }

    onGetOnlinePartnersButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        model.contacts.tools.getContacts().then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(JSON.stringify(resp.err));
                console.error(resp.err);
            }
            else {
                model.store.dispatch(model.contacts.actions.contactsLoaded(resp.re.partners));
                model.users.bus.emit('GetOnlinePartnersSuccess', resp.re);
            }
        });
    }

    onGetMembersButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt('Enter current partner email: ', '', (email1) => {
            if (email1 != '') {
                var contact1 = model.store.getState().contactData.contacts.find((c) => c.email == email1);
                if (contact1) {
                    var conv = model.conversations.tools.findOne(contact1.userId);
                    model.members.tools.getMembers(conv.id).then((resp) => {
                        if (resp.err) {
                            UIkit.modal.alert(JSON.stringify(resp.err));
                            console.error(resp.err);
                        }
                        else {
                            model.store.dispatch(model.members.actions.membersLoaded(conv.id, resp.members));
                            UIkit.modal.alert('done.');
                        }
                    });
                }
            }
        });
    }

    onAddMemberButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt('Enter current partner email: ', '', (email1) => {
            if (email1 != '') {
                var contact1 = model.store.getState().contactData.contacts.find((c) => c.email == email1);
                if (contact1) {
                    var conv = model.conversations.tools.findOne(contact1.userId);
                    UIkit.modal.prompt('Enter new member email', '', (email2) => {
                        if (email2 != '') {
                            var contact2 = model.store.getState().contactData.contacts.find((c) => c.email == email2);
                            model.members.tools.addMembers(conv.id, contact2.userId).then((resp) => {
                                if (resp.err) {
                                    UIkit.modal.alert(JSON.stringify(resp.err));
                                    console.error(resp.err);
                                }
                                else {
                                    console.log(resp);
                                    UIkit.modal.alert('done.');
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    onLogoutButtonClick(e: UIEvent) {
        e.preventDefault();
        e.stopPropagation();

        model.users.tools.logOut().then((resp) => {
            if (resp.err) {
                UIkit.modal.alert(JSON.stringify(resp.err));
                console.error(resp.err);
            }
            else {
                UIkit.modal.alert('Logged out. The page is going to reload...');
                setTimeout(() => { window.location.reload(); }, 2000);
            }
        });
    }

    onUpdateProfileButtonClick(e:UIEvent){
        e.preventDefault();
        e.stopPropagation();

        UIkit.modal.prompt('Avatar URL: ', '', (avatarURL) => {
            if(avatarURL != ''){
                model.users.tools.updateProfile({avatarUrl: avatarURL}).then((resp) => {
                    if(resp.err){
                        UIkit.modal.alert(JSON.stringify(resp.err));
                    }
                    else{
                        UIkit.modal.alert('done.');
                    }
                });
            }
        });
    }
}