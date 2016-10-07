import LotusService from '../lotus-service';
import store from '../store';

function signUp(name, email, password) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().isInit().then((Lotus) => {
            var data = {
                name: name,
                email: email,
                password: password,
                avatarUrl: 'no avatar',
                profileUrl: 'no profile',
                privacyLevel: 0
            };

            Lotus.AccountService.Account.signUp(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        });
    });
}

function signIn(email, password) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().isInit().then((Lotus) => {
            var data = {
                email: email,
                password: password,
                deviceId: 'BROWSER'
            }

            Lotus.AccountService.Session.signIn(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        });
    });
}

function autoLogin(token) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().isInit().then((Lotus) => {
            var data = {
                idToken: token,
                deviceId: 'BROWSER'
            };

            Lotus.AccountService.Session.tokenSignIn(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        });
    });
}

function logOut(){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            Lotus.AccountService.Session.signOut((error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

function updateProfile(data){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var user = store.getState().userData.user;

            data.avatarUrl = data.avatarUrl || user.avatarUrl;
            data.profileUrl = data.profileUrl || user.profileUrl;
            data.name = data.name || user.name;
            data.privacyLevel = data.privacyLevel || user.privacyLevel;

            Lotus.AccountService.Account.updateProfile(data, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

export { autoLogin, signIn, signUp, logOut, updateProfile };