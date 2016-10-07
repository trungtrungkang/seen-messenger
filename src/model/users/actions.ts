import {USERS} from '../types';
import * as ApplicationActions from '../application/actions';
import UserService from '../user-service';
import EventService from '../bus';
import bus from '../shared/bus';

let model = {
    app:{
        actions: ApplicationActions
    },
    users:{
        service: UserService,
        bus: EventService.singleton().cat('model').cat('users')
    }
};

const userActions = {
    login(email, password, doneCallback) {
        return (dispatch) => {
            dispatch(model.app.actions.toggleLoading(true));

            model.users.service.singleton().login(email, password).then((resp) => {
                dispatch(model.app.actions.toggleLoading(false));
                if(!resp.err){
                    localStorage.setItem('access_token', resp.re.idToken);
                    localStorage.setItem('device_id', resp.re.deviceId);
                    dispatch(userActions.loginSuccess(resp.re.user));

                    //dispatch(userActions.ssoLogin());
                    model.users.bus.emit('LoginSuccess', resp.re.user);
                }
                else {
                    dispatch(userActions.loginFailed(resp.err));
                    model.users.bus.emit('LoginFailed', resp.err);
                }

                doneCallback(resp);
            });
        };
    },
    loginFailed(error){
        return {type: USERS.LOGIN_FAILED, data: {error}};
    },
    loginSuccess(user){
        return {type: USERS.LOGIN_SUCCESS, data: user};
    },
    signupSuccess(user){
        return {type: USERS.SIGNUP_SUCCESS, data: user};
    },
    signupFailed(error){
        return {type: USERS.SIGNUP_FAILED, data: {error}};
    },
    signup(name, email, password, doneCallback){
        return (dispatch) => {
            dispatch(model.app.actions.toggleLoading(true));

            model.users.service.singleton().signup(name, email, password).then((resp) => {
                dispatch(model.app.actions.toggleLoading(false));

                if(!resp.err){
                    localStorage.setItem('access_token', resp.re.idToken);
                    localStorage.setItem('device_id', resp.re.deviceId);
                    dispatch(userActions.signupSuccess(resp.re.user));

                    model.users.bus.emit('SignupSuccess', resp.re.user);
                }
                else {
                    dispatch(userActions.signupFailed(resp.err));
                    model.users.bus.emit('SignupFailed', resp.err);
                }

                doneCallback(resp);
            });
        };
    },
    ssoLogin(){
        return (dispatch) => {
            dispatch(model.app.actions.toggleLoading(true));

            model.users.service.singleton().ssoLogin().then((resp) => {
                dispatch(model.app.actions.toggleLoading(false));

                if(resp){
                    if(!resp.err){
                        dispatch(userActions.ssoLoginSuccess(resp.re.user));
                        model.users.bus.emit('LoginSuccess', resp.re.user);
                    }
                    else{
                        dispatch(userActions.ssoLoginFailed(resp.err));
                        model.users.bus.emit('LoginFailed', resp.err);
                    }
                }
            });
        };
    },
    ssoLoginSuccess(profile){
        return {type: USERS.SSO_LOGIN_SUCCESS, data: profile};
    },
    ssoLoginFailed(resp){
        return {type: USERS.SSO_LOGIN_FAILED, data: resp};
    },
    updateProfile(profile){
        return (dispatch) => {
            dispatch({type: USERS.UPDATE_PROFILE, data: profile});
            bus.users.emit(USERS.UPDATE_PROFILE, profile);
        };
    },
    addFriend(email){
        return (dispatch) => {
            dispatch({type: USERS.ADD_FRIEND, email});
            bus.users.emit(USERS.ADD_FRIEND, email);
        };
    }
};

export default userActions;