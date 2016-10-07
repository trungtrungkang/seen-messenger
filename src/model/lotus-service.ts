import config from '../common/config';
import EventService from './bus';

declare var ClientIO, Client, ClientAPI;

var $andaman = EventService.singleton().cat('services').cat('andaman');
var $lotus = EventService.singleton().cat('services').cat('lotus');
var $users = EventService.singleton().cat('model').cat('users');

var Lotus = null;

var App = {
    client: null,
    Enum: ClientIO.Enum,
    init: function (config) {
        App.client = new Client(config, ClientIO, ClientAPI);

        var lotus = App.client.API;
        lotus.Enum = ClientIO.Enum;
        lotus.config = App.client.config;
        lotus.AccountService.Session.sessionId = App.client.sessionId;

        lotus.start = function (callback) {
            App.client.start(callback);
        };

        lotus.ready = function () {
            return lotus.pipe.ready();
        };

        lotus.info = function () {
            if (lotus.config.mode === 'DEV') {
                console.log('/********************************************************************/');
                console.log('Version: ', lotus.version);
                console.log('SessionId: ', lotus.AccountService.Session.sessionId);
                console.log('Config:', lotus.config);
                console.log('Enum:', lotus.Enum);
                console.log('/********************************************************************/');
            }
        };

        return lotus;
    }
};

export default class LotusService {
    private _config = {
        serverProtocol: null,
        port: null,
        mode: App.Enum.Mode.DEV,
        device: App.Enum.Device.WS,
        host: '192.168.2.221'
        //host: '113.190.44.122',//window.location.hostname,
        // requestTimeoutSecs: 60
    };

    private _initialized = false;
    private _ready = false;
    private _sessionReady = false;
    private _isLoggingIn = false;
    private bus = new EventService();

    private initialize() {
        if(this._initialized) return;
        this._initialized = true;
        var config = this._config;
        switch (config.host) {
            case '64.71.165.210':
            case '64.71.165.211':
            case '64.71.165.212':
                config.serverProtocol = App.Enum.ServerProtocol.HTTP;
                config.port = 80;
                break;

            case 'devchat.seen.life':
                config.serverProtocol = App.Enum.ServerProtocol.HTTPS;
                config.port = 443;
                break;
            case 'qachat.seen.life':
                config.serverProtocol = App.Enum.ServerProtocol.HTTPS;
                config.port = 443;
                break;

            default:
                config.port = 3001;
                break;

        }

        Lotus = App.init(config);
        Lotus.info();

        Lotus.start((status, response) => {
            switch (status) {
                case Lotus.Enum.Status.CONNECTION_OPENED:
                    this._ready = true;
                    this.bus.emit('onReady', Lotus);
                    break;

                case Lotus.Enum.Status.CONNECTION_CLOSED:
                    this._ready = false;
                    break;

                case Lotus.Enum.Status.SESSION_RESTORED:
                    this._sessionReady = true;
                    this.bus.emit('onSessionReady', Lotus);
                    break;

                case Lotus.Enum.Status.SESSION_UPDATED:
                    this._sessionReady = true;
                    this.bus.emit('onSessionReady', Lotus);
                    break;

                case Lotus.Enum.Status.SESSION_FAILED:
                    this._sessionReady = false;
                    this.bus.emit('onSessionFailed', Lotus);
                    break;
            }
            
            console.log(status, response);
        });

        Lotus.ChatService.Message.onMessage((error, result) => {
            $lotus.emit('Message.onMessage', {err: error, re: result});
        });
    }

    ready() {
        return new Promise<any>((resolve) => {
            this.isInit().then((Lotus) => {
                if (this._sessionReady) resolve(Lotus);
                else {
                    this.bus.once('onSessionReady', (Lotus) => {
                        this._isLoggingIn = false;
                        resolve(Lotus);
                    });

                    if (!this._isLoggingIn) {
                        this._isLoggingIn = true;
                        this.emit('users.login_required');
                    }
                }
            });
        });
    }

    isInit() {
        return new Promise<any>((resolve) => {
            if (Lotus) {
                if (this._ready) resolve(Lotus);
                else {
                    this.bus.once('onReady', (Lotus) => {
                        resolve(Lotus);
                    });
                }
            }
            else {
                this.bus.once('onReady', (Lotus) => {
                    resolve(Lotus);
                });

                this.initialize();
            }
        });
    }

    on(name, fn) {
        $lotus.on(name, fn);
        return this;
    }

    off(name, fn?) {
        $lotus.off(name, fn);
        return this;
    }

    emit(name, ...params){
        $lotus.emit(name, ...params);
    }

    private static _instance: LotusService;
    static singleton(): LotusService {
        if (!LotusService._instance) {
            LotusService._instance = new LotusService();
        }

        return LotusService._instance;
    }
}

// export default class AndamanService {
//     private service;

//     constructor() { }

//     ready() {
//         return new Promise<any>((resolve) => {
//             this.isInit().then(() => {
//                 this.service.ready(() => resolve(Andaman));
//             });
//         });
//     }

//     isInit() {
//         return new Promise<any>((resolve) => {
//             if (!this.service) {
//                 this.service = createService();
//                 this.service.init().then(() => {
//                     this.service.isInit(() => resolve(Andaman));
//                 });
//             }
//             else this.service.isInit(() => resolve(Andaman));
//         });
//     }

//     on(name, fn) {
//         $andaman.on(name, fn);
//         return this;
//     }

//     off(name, fn?) {
//         $andaman.off(name, fn);
//         return this;
//     }

//     private static _instance: AndamanService;
//     static singleton(): AndamanService {
//         if (!AndamanService._instance) {
//             AndamanService._instance = new AndamanService();
//         }

//         return AndamanService._instance;
//     }
// }

// function createService() {
//     var bus = EventService.singleton();
//     var conf = config;
//     var initCallbacks = [];
//     var readyCallbacks = [];
//     var isAndamanInited = false;
//     var isSessionReady = false;
//     var isAndamanBusy = false;
//     var lastState = null;

//     return {
//         init: function () {
//             return new Promise(function (resolve, reject) {
//                 var config = {
//                     mode: Andaman.Enum.Mode.DEV,
//                     // serverProtocol: Andaman.Enum.ServerProtocol.HTTPS,
//                     // paramProtocol: Andaman.Enum.DataProtocol.SIMPLE,
//                     device: Andaman.Enum.Device.WS,

//                     requestTimeoutSecs: 30, // Timeout for all APIs
//                     blobTimeoutSecs: 300, // Timeout for file transfering, default is 120s if not declared here

//                     host: conf.andaman_server.host,
//                     port: conf.andaman_server.port,
//                     serverProtocol: conf.andaman_server.serverProtocol

//                     // host: 'localhost',
//                     // port: 3001,

//                     // serverPublicKey: '',
//                     // clientPublicKey: '',
//                     // clientSecretKey: ''
//                     // idToken:'',
//                     // sessionToken:'',
//                 };
//                 Andaman.init(config);
//                 Andaman.info();

//                 setTimeout(function () {
//                     Andaman.client.start(andamanCallback);
//                 }, 0);

//                 resolve();
//             });
//         },
//         on: function (name, handler) {
//             $andaman.on(name, handler);
//         },
//         off: function (name, handler) {
//             $andaman.off(name, handler);
//         },
//         once: function (name, handler) {
//             $andaman.once(name, handler);
//         },
//         isInit: function (cb) {
//             if (isAndamanInited) {
//                 cb();
//             }
//             else {
//                 initCallbacks.push(cb);
//             }
//         },
//         ready: function (cb) {
//             this.isInit(() => {
//                 if (isSessionReady) cb();
//                 else {
//                     readyCallbacks.push(cb);

//                     if (!isAndamanBusy) {
//                         isAndamanBusy = true;
//                         $andaman.emit('users.login_required').then(() => {
//                             isAndamanBusy = false;
//                         }).catch((err) => {
//                             isAndamanBusy = false;
//                         });
//                     }
//                 }
//             });
//         },
//         reconnect: function () {
//             return new Promise(function (resolve, reject) {
//                 var isHandled = false;
//                 var socket = Andaman.client.pipe.socket.innerSocket.innerSocket;
//                 var listener = function pong() {
//                     if (!isHandled) {
//                         isHandled = true;
//                         resolve(true);
//                     }
//                 }

//                 socket.once('pong', listener);
//                 socket.ping();

//                 setTimeout(function () {
//                     if (!isHandled) {
//                         isHandled = true;
//                         resolve(false);
//                     }
//                 }, 10000);
//             });
//         }
//     };

//     function andamanCallback(status, response) {
//         if (lastState && lastState.status == status && lastState.resp == response) {
//             return;
//         }

//         // Register to Coke events
//         if (!Andaman.isCokeEventsRegistered) {

//             Andaman.isCokeEventsRegistered = true;

//             Andaman.messages.on_receive_message_one(function (msg) {
//                 $andaman.emit('messages.on_receive_message_one', msg);
//             });

//             Andaman.messages.on_unread_message_count(function (resp) {
//                 //dw.external.Andaman.events.on_unread_message_count(resp);
//             });

//             Andaman.groups.on_receiver_create_group(function (err, re) {
//                 // dw.external.Andaman.events.on_receiver_added_to_group(err, re);
//             });

//             Andaman.groups.on_receiver_added_to_group(function (err, re) {
//                 //dw.external.Andaman.events.on_receiver_added_to_group(err, re);
//             });

//             Andaman.groups.on_receiver_removed_from_group(function (err, re) {
//                 // dw.external.Andaman.events.on_receiver_added_to_group(err, re);
//             });

//             Andaman.groups.on_receiver_add_members(function (err, re) {
//                 //dw.external.Andaman.events.on_receiver_add_members(err, re);
//             });

//             Andaman.groups.on_receiver_remove_members(function (err, re) {
//                 // dw.external.Andaman.events.on_receiver_add_members(err, re);
//             });

//             Andaman.groups.on_receiver_leave_group(function (err, re) {
//                 //dw.external.Andaman.events.on_receiver_leave_group(err, re);
//             });

//             Andaman.groups.on_receiver_delete_group(function (err, re) {
//                 //dw.external.Andaman.events.on_receiver_delete_group(err, re);
//             });

//             Andaman.rosters.on_partner_added(function (resp) {
//                 //dw.external.Andaman.events.on_partner_added(resp);
//                 $andaman.emit('contacts.on_partner_added', resp);
//             });

//             Andaman.rosters.on_partner_removed(function (resp) {
//                 //dw.external.Andaman.events.on_partner_removed(resp);
//                 $andaman.emit('contacts.on_partner_removed', resp);
//             });

//             Andaman.rosters.on_partner_updated(function (resp) {
//                 //dw.external.Andaman.events.on_partner_updated(resp);
//                 $andaman.emit('contacts.on_partner_updated', resp);
//             });
//         }

//         switch (status) {
//             case Andaman.Enum.Status.CONNECTION_OPENED:
//                 Andaman._is_ready = true;
//                 onAndamanInited();
//                 break;

//             case Andaman.Enum.Status.CONNECTION_CLOSED:
//                 isAndamanInited = false;
//                 Andaman._is_ready = false;
//                 isSessionReady = false;

//                 if (Andaman._closeCallback) {
//                     var cb = Andaman._closeCallback;
//                     Andaman._closeCallback = null;
//                     cb();
//                 }
//                 break;

//             case Andaman.Enum.Status.SESSION_RESTORED:
//                 Andaman._is_ready = true;
//                 onAndamanReady();
//                 break;

//             case Andaman.Enum.Status.SESSION_UPDATED:
//                 Andaman._is_ready = true;
//                 onAndamanReady();
//                 break;

//             case Andaman.Enum.Status.SESSION_FAILED:
//                 Andaman._is_ready = false;
//                 isSessionReady = false;
//                 break;

//         }

//         console.log(status, response);

//         lastState = {
//             status: status,
//             resp: response
//         };
//     }

//     function onAndamanInited() {
//         if (!isAndamanInited) {
//             isAndamanInited = true;
//             while (initCallbacks.length) {
//                 var cb = initCallbacks.shift();
//                 cb();
//             };
//         }
//     }

//     function onAndamanReady() {
//         if (!isSessionReady) {
//             isSessionReady = true;
//             while (readyCallbacks.length) {
//                 var cb = readyCallbacks.shift();
//                 cb();
//             };
//         }
//     }
// };