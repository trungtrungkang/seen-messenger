import * as common from '../common/common';
import LotusService from './lotus-service';
import store from './store';
import * as actions from './actions';

export default class UserService{
    constructor(){}

    ssoLogin(){
        return new Promise<any>((resolve, reject) => {
            /*
            var param = {
                idToken: idToken,
                deviceId: deviceId
            }
            Lotus.AccountService.Session.tokenSignIn(param, function(error, result, payload, roundTripTime, serverLatency) {
                print('#tokenSignIn', error, result, payload, roundTripTime, serverLatency)
                assert.equal(null, error);
                if (!error) {}
                done();
            });
            */
            let accessToken = localStorage.getItem('access_token');
            let deviceId = localStorage.getItem('device_id');

            if(accessToken){
                var lotus = LotusService.singleton();
                lotus.isInit().then((Lotus) => {
                    var data = {
                        idToken: accessToken,
                        deviceId: deviceId || 'BROWSER'
                    };


                    Lotus.AccountService.Session.tokenSignIn(data, (error, result) => {
                        resolve({err: error, re: result});
                    });
                });
            }
            else{
                resolve({err: 'The access_token is not found.'});
            }
        });
    }

    login(email, password){
        return new Promise<any>((resolve) => {
            LotusService.singleton().isInit().then((Lotus) => {
                /*
                var param = {
					email: user.email,
					password: user.password,
					deviceId: user.deviceId,
				}

				Lotus.AccountService.Session.signIn(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#signIn', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					if (!error) {
						idToken = result.idToken;
						deviceId = result.user.deviceId;
					}
					done();
				});
                */

                let deviceId = localStorage.getItem('device_id');
                var data = {
                    email: email,
                    password: password,
                    deviceId: deviceId || 'BROWSER'
                };

                Lotus.AccountService.Session.signIn(data, (error, result) => {
                    resolve({err: error, re: result});
                });
            });
        });
    }

    signup(name, email, password, avatarUrl = '', profileUrl = ''){
        /*
        var param = {
            name: user.name,
            email: user.email,
            password: user.password,
            avatarUrl: user.avatarUrl,
            profileUrl: user.profileUrl,
            privacyLevel: 0
        };

        Lotus.AccountService.Account.signUp(param, function(error, result, payload, roundTripTime, serverLatency) {
            print('#signUp', error, result, payload, roundTripTime, serverLatency)

            if (error) {
                assert.equal("Error.AccountService.Account.EMAIL_EXISTS", error.code);
            }

            if (!error) {
                idToken = result.idToken;
            }
            done();
        });
        */

        var data = {
            name: name || email,
            email: email,
            password: password,
            avatarUrl: avatarUrl,
            profileUrl: profileUrl,
            privacyLevel: 0
        };

        return new Promise<any>((resolve) => {
            LotusService.singleton().isInit().then((Lotus) => {
                Lotus.AccountService.Account.signUp(data, (error, result) => {
                    resolve({err: error, re: result});
                });
            });
        });
    }

    loginOrSignup(email, password){
        return new Promise<any>((resolve) => {
            this.login(email, password).then((resp) => {
                if(resp.err){
                    var err = resp.err;
                    if(err.code == 'Error.AccountService.Account.EMAIL_DOES_NOT_EXIST' ||
                        err.code == 'Error.Account1Service.Account1.EMAIL_LOGIN_FAILED'){
                        var idx = email.indexOf('@');
                        var name = String(email).substr(0, idx);
                        this.signup(name, email, password).then(resolve);
                    }
                    else{
                        resolve(resp);
                    }
                }
                else{
                    resolve(resp);
                }
            });
        });
    }

    private static _instance: UserService;
    static singleton(){
        if(!UserService._instance) {
            UserService._instance = new UserService();
        }

        return UserService._instance;
    }
}