(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ClientAPI = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * @copyright Unseen, Inc.
 */

/* System generated file. Do not modify. */

'option strict';

module.exports = {
    Key: {
        "2i34lm": "AccountService.Account.SIGN_UP",
        "1AU3vj": "AccountService.Account.UPDATE_PROFILE",
        iY6g5: "AccountService.Session.SIGN_IN",
        Z1MCuQg: "AccountService.Session.TOKEN_SIGN_IN",
        Z2TCLI: "AccountService.Session.SET_STATE",
        ZvQ4OR: "AccountService.Session.SIGN_OUT",
        W0Ktc: "AccountService.Roster.ADD_PARTNER",
        Z1otpxy: "AccountService.Roster.REMOVE_PARTNER",
        Zn81jE: "AccountService.Roster.GET_OFFLINE_NEXT_PAGE",
        Z14pECD: "AccountService.Roster.GET_ONLINE_NEXT_PAGE",
        b0RKC: "AccountService.Roster.On.STATE_CHANGED",
        "2onRHm": "AccountService.Roster.On.PARTNER_ADDED",
        dAPo3: "AccountService.Roster.On.PARTNER_REMOVED",
        Z1wOjFV: "ChatService.Message.CHAT",
        Z1STJNK: "ChatService.Message.PHOTO",
        "15nD0m": "ChatService.Message.MISSED_CALL",
        "10PyVI": "ChatService.Message.AUDIO_CALL",
        "2li3Xn": "ChatService.Message.VIDEO_CALL",
        g63Hq: "ChatService.Message.GET_BY_ID",
        "1002Ec": "ChatService.Message.SET_READ_MESSAGE",
        "1qO9P1": "ChatService.Message.GET_NEXT_PAGE",
        Z1oBAXV: "ChatService.Message.GET_PREVIOUS_PAGE",
        ZEPJEc: "ChatService.Message.On.MESSAGE",
        Z1kcDr5: "ChatService.Message.On.MESSAGE_STATS",
        ZU8xEi: "ChatService.Conversation.CREATE_ONE",
        nnSq4: "ChatService.Conversation.CREATE_GROUP",
        Z2wzTlH: "ChatService.Conversation.UPDATE_TITLE",
        "3jAEz": "ChatService.Conversation.ADD_MEMBERS",
        aBCdC: "ChatService.Conversation.REMOVE_MEMBERS",
        "2uFNoD": "ChatService.Conversation.LEAVE_GROUP",
        "1fcCFy": "ChatService.Conversation.DELETE",
        Z1pqGbp: "ChatService.Conversation.GET_MEMBERS",
        "1PPlUY": "ChatService.Conversation.GET_BY_ID",
        XW083: "ChatService.Conversation.GET_NEXT_PAGE",
        JJ8ac: "ChatService.Conversation.GET_PREVIOUS_PAGE",
        Z2guxpL: "ChatService.Conversation.On.CREATED",
        Za9edJ: "ChatService.Conversation.On.MEMBERS_ADDED",
        mtFRI: "ChatService.Conversation.On.MEMBERS_REMOVED",
        Z1DNc8f: "ChatService.Conversation.On.DELETED",
        "1vpGOC": "CommunityService.Community.CREATE",
        "27uLm4": "CommunityService.Community.UPDATE",
        "1wCRlF": "CommunityService.Community.DELETE",
        "22CqAT": "CommunityService.Community.SEARCH",
        I1kJS: "CommunityService.Community.NEXT_PAGE",
        Z2ve2YU: "CommunityService.User.ADD_FAVORITE",
        "8A604": "CommunityService.User.REMOVE_FAVORITE",
        xlF2C: "CommunityService.User.FAVOURITES",
        "2wdlAi": "CommunityService.Administrator.ADD",
        ci7Nl: "CommunityService.Administrator.REMOVE",
        Z1EeTJe: "CommunityService.Member.ADD",
        Z1cxpsv: "CommunityService.Member.REMOVE",
        Z20QCVO: "CommunityService.Member.SET_ROLE",
        Z1lkyMT: "CommunityService.Member.GET_ROLE",
        Z1EeTuP: "CommunityService.Member.BAN",
        "1KTUqc": "CommunityService.Member.UNBAN",
        Z1auPY2: "CommunityService.Member.SEARCH",
        Z27IGGK: "CommunityService.Member.NEXT_PAGE",
        ZAyDPg: "CommunityService.Member.JOIN",
        "1Ki7yn": "CommunityService.Member.LEAVE",
        "1E7phu": "CommunityService.Post.CHAT",
        xDlOH: "CommunityService.Post.PHOTO",
        ZwHbQy: "CommunityService.Post.SET_READ_POST",
        Z20bHT2: "CommunityService.Post.NEXT_PAGE",
        "1il7LN": "CommunityService.Post.PREVIOUS_PAGE",
        "1nB1BY": "CommunityService.Post.On.POST",
        "9Ty7q": "CommunityService.Post.On.POST_STATS",
        Z2c6AVC: "CommunityService.Topic.CREATE",
        Z1A1wpb: "CommunityService.Topic.UPDATE",
        Z2aSqpz: "CommunityService.Topic.DELETE",
        Z1ESRal: "CommunityService.Topic.SEARCH",
        Z1W7Dtk: "CommunityService.Topic.NEXT_PAGE",
        Z265rPX: "CommunityService.Topic.FOLLOW",
        "5E1pM": "CommunityService.Topic.UNFOLLOW",
        Z2vPAv1: "CommunityService.Topic.FOLLOWING",
        Z2vPBuN: "CommunityService.Topic.FOLLOWERS",
        BwDSC: "BlobService.Blob.WRITE_BLOB",
        ZzEREl: "BlobService.Blob.READ_BLOB",
        Z1g8IFo: "BlobService.Blob.WRITE_CHUNK",
        "2d4RB6": "BlobService.Blob.READ_CHUNK"
    },
    GlobalSessionService: {},
    CentralAuthenticationService: {},
    AccountService: {
        Account: {
            SIGN_UP: "2i34lm",
            UPDATE_PROFILE: "1AU3vj"
        },
        Session: {
            SIGN_IN: "iY6g5",
            TOKEN_SIGN_IN: "Z1MCuQg",
            SET_STATE: "Z2TCLI",
            SIGN_OUT: "ZvQ4OR"
        },
        Roster: {
            ADD_PARTNER: "W0Ktc",
            REMOVE_PARTNER: "Z1otpxy",
            GET_OFFLINE_NEXT_PAGE: "Zn81jE",
            GET_ONLINE_NEXT_PAGE: "Z14pECD",
            On: {
                STATE_CHANGED: "b0RKC",
                PARTNER_ADDED: "2onRHm",
                PARTNER_REMOVED: "dAPo3"
            }
        }
    },
    ChatService: {
        Message: {
            CHAT: "Z1wOjFV",
            PHOTO: "Z1STJNK",
            MISSED_CALL: "15nD0m",
            AUDIO_CALL: "10PyVI",
            VIDEO_CALL: "2li3Xn",
            GET_BY_ID: "g63Hq",
            SET_READ_MESSAGE: "1002Ec",
            GET_NEXT_PAGE: "1qO9P1",
            GET_PREVIOUS_PAGE: "Z1oBAXV",
            On: {
                MESSAGE: "ZEPJEc",
                MESSAGE_STATS: "Z1kcDr5"
            }
        },
        Conversation: {
            CREATE_ONE: "ZU8xEi",
            CREATE_GROUP: "nnSq4",
            UPDATE_TITLE: "Z2wzTlH",
            ADD_MEMBERS: "3jAEz",
            REMOVE_MEMBERS: "aBCdC",
            LEAVE_GROUP: "2uFNoD",
            DELETE: "1fcCFy",
            GET_MEMBERS: "Z1pqGbp",
            GET_BY_ID: "1PPlUY",
            GET_NEXT_PAGE: "XW083",
            GET_PREVIOUS_PAGE: "JJ8ac",
            On: {
                CREATED: "Z2guxpL",
                MEMBERS_ADDED: "Za9edJ",
                MEMBERS_REMOVED: "mtFRI",
                DELETED: "Z1DNc8f"
            }
        }
    },
    CommunityService: {
        Community: {
            CREATE: "1vpGOC",
            UPDATE: "27uLm4",
            DELETE: "1wCRlF",
            SEARCH: "22CqAT",
            NEXT_PAGE: "I1kJS"
        },
        User: {
            ADD_FAVORITE: "Z2ve2YU",
            REMOVE_FAVORITE: "8A604",
            FAVOURITES: "xlF2C"
        },
        Administrator: {
            ADD: "2wdlAi",
            REMOVE: "ci7Nl"
        },
        Member: {
            ADD: "Z1EeTJe",
            REMOVE: "Z1cxpsv",
            SET_ROLE: "Z20QCVO",
            GET_ROLE: "Z1lkyMT",
            BAN: "Z1EeTuP",
            UNBAN: "1KTUqc",
            SEARCH: "Z1auPY2",
            NEXT_PAGE: "Z27IGGK",
            JOIN: "ZAyDPg",
            LEAVE: "1Ki7yn"
        },
        Post: {
            CHAT: "1E7phu",
            PHOTO: "xDlOH",
            SET_READ_POST: "ZwHbQy",
            NEXT_PAGE: "Z20bHT2",
            PREVIOUS_PAGE: "1il7LN",
            On: {
                POST: "1nB1BY",
                POST_STATS: "9Ty7q"
            }
        },
        Topic: {
            CREATE: "Z2c6AVC",
            UPDATE: "Z1A1wpb",
            DELETE: "Z2aSqpz",
            SEARCH: "Z1ESRal",
            NEXT_PAGE: "Z1W7Dtk",
            FOLLOW: "Z265rPX",
            UNFOLLOW: "5E1pM",
            FOLLOWING: "Z2vPAv1",
            FOLLOWERS: "Z2vPBuN"
        }
    },
    BlobService: {
        Blob: {
            WRITE_BLOB: "BwDSC",
            READ_BLOB: "ZzEREl",
            WRITE_CHUNK: "Z1g8IFo",
            READ_CHUNK: "2d4RB6"
        }
    }
};
},{}],2:[function(require,module,exports){
/*
 * @copyright Unseen, Inc.
 */

'option strict';

module.exports = {
    AccountService: {
        State: {
            OFFLINE: 0,
            INVISIBLE: 1,
            ONLINE: 2,
            BUSY: 3,
            AWAY: 4
        },

        DeviceId: {
            BROWSER: 'BROWSER'
        },

        PrivacyLevel: {
            PUBLIC: 0,
            FRIENDS: 1
        }
    },

    ChatService: {
        Conversation: {
            ConversationType: {
                ONE: 0,
                GROUP: 1
            },

            MemberType: {
                OWNER: 'OWNER',
                MEMBER: 'MEMBER'
            }
        }
    }
}
},{}],3:[function(require,module,exports){
/*
 * @copyright Unseen, ehf
 */

'option strict';

module.exports = MessageHelper;

function MessageHelper() {}

MessageHelper.prototype.parseBody = function(rows) {
	var index = rows.length;
	while (index--) {
		rows[index].body = this.fromJson(rows[index].body);
	}
}

MessageHelper.prototype.toJson = function(value) {
	return JSON.stringify(value);
}

MessageHelper.prototype.fromJson = function(value) {
	try {
		return JSON.parse(value);

	} catch (err) {
		return '';
	}
}
},{}],4:[function(require,module,exports){
/*
 * @copyright Unseen, Inc.
 */

/*  
    System generated file. 
    
    On update:
    - File will be backed as 1-index.js, 2-index.js, ...  
    - Invalid functions will be removed. 
    - All other modifications will be preserved.    
*/

'option strict';

var Commands = require('./commands'),
    AppEnum = require('./helpers/enum'),
    MessageHelper = require('./helpers/messageHelper');

module.exports = API;

function API(pipe) {
    this.version = '2.0';
    this.pipe = pipe;
    this.pipe.Enum.Command = Commands;
    this.pipe.Enum.App = AppEnum;
    this.GlobalSessionService = new GlobalSessionService(this.pipe);
    this.CentralAuthenticationService = new CentralAuthenticationService(this.pipe);
    this.AccountService = new AccountService(this.pipe);
    this.BlobService = new BlobService(this.pipe);
    this.ChatService = new ChatService(this.pipe);
    this.CommunityService = new CommunityService(this.pipe);
};

function GlobalSessionService(pipe) {};

function CentralAuthenticationService(pipe) {};

function AccountService(pipe) {
    this.Account = new Account(pipe);
    this.Session = new Session(pipe);
    this.Roster = new Roster(pipe);
};

function Account(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Session(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Roster(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function ChatService(pipe) {
    this.Message = new Message(pipe);
    this.Conversation = new Conversation(pipe);
};

function Message(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
    this.messageHelper = new MessageHelper();
};

function Conversation(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function CommunityService(pipe) {
    this.Community = new Community(pipe);
    this.User = new User(pipe);
    this.Administrator = new Administrator(pipe);
    this.Member = new Member(pipe);
    this.Post = new Post(pipe);
    this.Topic = new Topic(pipe);
};

function Community(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function User(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Administrator(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Member(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Post(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
    this.messageHelper = new MessageHelper();
};

function Topic(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function BlobService(pipe) {
    this.Blob = new Blob(pipe);
};

function Blob(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

Account.prototype.signUp = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.SIGN_UP, param, null, callback);
};

Account.prototype.updateProfile = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.UPDATE_PROFILE, param, null, callback);
};

Session.prototype.signIn = function(param, callback) {
    param.sessionId = this.sessionId;
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.SIGN_IN, param, null, callback);
};

Session.prototype.tokenSignIn = function(param, callback) {
    param.sessionId = this.sessionId;
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.TOKEN_SIGN_IN, param, null, callback);
};

Session.prototype.setState = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.SET_STATE, param, null, callback);
};

Session.prototype.signOut = function(callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.SIGN_OUT, null, null, callback);
};

Roster.prototype.addPartner = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Roster.ADD_PARTNER, param, null, callback);
};

Roster.prototype.removePartner = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Roster.REMOVE_PARTNER, param, null, callback);
};

Roster.prototype.getOfflineNextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Roster.GET_OFFLINE_NEXT_PAGE, param, null, callback);
};

Roster.prototype.getOnlineNextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Roster.GET_ONLINE_NEXT_PAGE, param, null, callback);
};

Roster.prototype.onStateChanged = function(callback) {
    this.pipe.on(this.Enum.Command.AccountService.Roster.On.STATE_CHANGED, callback);
};

Roster.prototype.onPartnerAdded = function(callback) {
    this.pipe.on(this.Enum.Command.AccountService.Roster.On.PARTNER_ADDED, callback);
};

Roster.prototype.onPartnerRemoved = function(callback) {
    this.pipe.on(this.Enum.Command.AccountService.Roster.On.PARTNER_REMOVED, callback);
};

Message.prototype.chat = function(param, fileBuffer, callback, percentCallback) {
    if (!fileBuffer) {
        param.body = this.messageHelper.toJson(param.body);
        this.pipe.sendRequest(this.Enum.Command.ChatService.Message.CHAT, param, null, callback, percentCallback);

    } else {
        param.body.file = param.body.file || {};
        param.body.file.name = param.body.file.name || '*unknown*';
        param.body.file.type = param.body.file.type || '*unknown*';
        param.body.file.size = fileBuffer.length;

        param.Context = param.body.file;
        param.body = this.messageHelper.toJson(param.body);
        this.pipe.blobSendRequest(this.Enum.Command.ChatService.Message.CHAT, param, fileBuffer, callback, percentCallback);
    }
};

Message.prototype.photo = function(param, photoBuffer, callback, percentCallback) {
    param.body.photo = param.body.photo || {};
    param.body.photo.name = param.body.photo.name || '*unknown*';
    param.body.photo.type = param.body.photo.type || '*unknown*';
    param.body.photo.size = photoBuffer.length;

    param.Context = param.body.photo;
    param.body = this.messageHelper.toJson(param.body);
    this.pipe.blobSendRequest(this.Enum.Command.ChatService.Message.PHOTO, param, photoBuffer, callback, percentCallback);
};

Message.prototype.missedCall = function(param, callback) {
    param.body = this.messageHelper.toJson(param.body);
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.MISSED_CALL, param, null, callback);
};

Message.prototype.audioCall = function(param, callback) {
    param.body = this.messageHelper.toJson(param.body);
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.AUDIO_CALL, param, null, callback);
};

Message.prototype.videoCall = function(param, callback) {
    param.body = this.messageHelper.toJson(param.body);
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.VIDEO_CALL, param, null, callback);
};

Message.prototype.getById = function(param, callback) {
    var self = this;
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.GET_BY_ID, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        if (!error && result.message) {
            result.message.body = self.messageHelper.fromJson(result.message.body);
        }
        callback(error, result, payload, roundTripTime, serverLatency);
    });
};

Message.prototype.setReadMessage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.SET_READ_MESSAGE, param, null, callback);
};

Message.prototype.getNextPage = function(param, callback) {
    var self = this;
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.GET_NEXT_PAGE, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        if (!error) {
            self.messageHelper.parseBody(result.rows);
        }
        callback(error, result, payload, roundTripTime, serverLatency);
    });
};

Message.prototype.getPreviousPage = function(param, callback) {
    var self = this;
    this.pipe.sendRequest(this.Enum.Command.ChatService.Message.GET_PREVIOUS_PAGE, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        self.messageHelper.parseBody(result.rows);
        callback(error, result, payload, roundTripTime, serverLatency);
    });
};

Message.prototype.onMessage = function(callback) {
    var self = this;
    this.pipe.on(this.Enum.Command.ChatService.Message.On.MESSAGE, function(error, result, payload, roundTripTime, serverLatency) {
        if (!error) {
            result.message.body = self.messageHelper.fromJson(result.message.body);
        }
        callback(error, result, payload, roundTripTime, serverLatency);
    });
};

Message.prototype.onMessageStats = function(callback) {
    this.pipe.on(this.Enum.Command.ChatService.Message.On.MESSAGE_STATS, callback);
};

Conversation.prototype.createOne = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.CREATE_ONE, param, null, callback);
};

Conversation.prototype.createGroup = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.CREATE_GROUP, param, null, callback);
};

Conversation.prototype.updateTitle = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.UPDATE_TITLE, param, null, callback);
};

Conversation.prototype.addMembers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.ADD_MEMBERS, param, null, callback);
};

Conversation.prototype.removeMembers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.REMOVE_MEMBERS, param, null, callback);
};

Conversation.prototype.leaveGroup = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.LEAVE_GROUP, param, null, callback);
};

Conversation.prototype.delete = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.DELETE, param, null, callback);
};

Conversation.prototype.getMembers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.GET_MEMBERS, param, null, callback);
};

Conversation.prototype.getById = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.GET_BY_ID, param, null, callback);
};

Conversation.prototype.getNextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.GET_NEXT_PAGE, param, null, callback);
};

Conversation.prototype.getPreviousPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.ChatService.Conversation.GET_PREVIOUS_PAGE, param, null, callback);
};

Conversation.prototype.onCreated = function(callback) {
    this.pipe.on(this.Enum.Command.ChatService.Conversation.On.CREATED, callback);
};

Conversation.prototype.onMembersAdded = function(callback) {
    this.pipe.on(this.Enum.Command.ChatService.Conversation.On.MEMBERS_ADDED, callback);
};

Conversation.prototype.onMembersRemoved = function(callback) {
    this.pipe.on(this.Enum.Command.ChatService.Conversation.On.MEMBERS_REMOVED, callback);
};

Conversation.prototype.onDeleted = function(callback) {
    this.pipe.on(this.Enum.Command.ChatService.Conversation.On.DELETED, callback);
};

Community.prototype.create = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Community.CREATE, param, null, callback);
};

Community.prototype.update = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Community.UPDATE, param, null, callback);
};

Community.prototype.delete = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Community.DELETE, param, null, callback);
};

Community.prototype.search = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Community.SEARCH, param, null, callback);
};

Community.prototype.nextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Community.NEXT_PAGE, param, null, callback);
};

User.prototype.addFavorite = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.User.ADD_FAVORITE, param, null, callback);
};

User.prototype.removeFavorite = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.User.REMOVE_FAVORITE, param, null, callback);
};

User.prototype.favourites = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.User.FAVOURITES, param, null, callback);
};

Administrator.prototype.add = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Administrator.ADD, param, null, callback);
};

Administrator.prototype.remove = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Administrator.REMOVE, param, null, callback);
};

Member.prototype.add = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.ADD, param, null, callback);
};

Member.prototype.remove = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.REMOVE, param, null, callback);
};

Member.prototype.setRole = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.SET_ROLE, param, null, callback);
};

Member.prototype.getRole = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.GET_ROLE, param, null, callback);
};

Member.prototype.ban = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.BAN, param, null, callback);
};

Member.prototype.unban = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.UNBAN, param, null, callback);
};

Member.prototype.search = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.SEARCH, param, null, callback);
};

Member.prototype.nextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.NEXT_PAGE, param, null, callback);
};

Member.prototype.join = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.JOIN, param, null, callback);
};

Member.prototype.leave = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Member.LEAVE, param, null, callback);
};

Post.prototype.chat = function(param, fileBuffer, callback, percentCallback) {
    if (!fileBuffer) {
        param.body = this.messageHelper.toJson(param.body);
        this.pipe.sendRequest(this.Enum.Command.CommunityService.Post.CHAT, param, null, callback, percentCallback);

    } else {
        param.body.file = param.body.file || {};
        param.body.file.name = param.body.file.name || '*unknown*';
        param.body.file.type = param.body.file.type || '*unknown*';
        param.body.file.size = fileBuffer.length;

        param.Context = param.body.file;
        param.body = this.messageHelper.toJson(param.body);
        this.pipe.blobSendRequest(this.Enum.Command.CommunityService.Post.CHAT, param, fileBuffer, callback, percentCallback);
    }
};

Post.prototype.photo = function(param, photoBuffer, callback, percentCallback) {
    param.body.photo = param.body.photo || {};
    param.body.photo.name = param.body.photo.name || '*unknown*';
    param.body.photo.type = param.body.photo.type || '*unknown*';
    param.body.photo.size = photoBuffer.length;

    param.Context = param.body.photo;
    param.body = this.messageHelper.toJson(param.body);
    this.pipe.blobSendRequest(this.Enum.Command.CommunityService.Post.PHOTO, param, photoBuffer, callback, percentCallback);
};

Post.prototype.setReadPost = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Post.SET_READ_POST, param, null, callback);
};

Post.prototype.nextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Post.NEXT_PAGE, param, null, callback);
};

Post.prototype.previousPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Post.PREVIOUS_PAGE, param, null, callback);
};

Post.prototype.onPost = function(callback) {
    this.pipe.on(this.Enum.Command.CommunityService.Post.On.POST, callback);
};

Post.prototype.onPostStats = function(callback) {
    this.pipe.on(this.Enum.Command.CommunityService.Post.On.POST_STATS, callback);
};

Topic.prototype.create = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.CREATE, param, null, callback);
};

Topic.prototype.update = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.UPDATE, param, null, callback);
};

Topic.prototype.delete = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.DELETE, param, null, callback);
};

Topic.prototype.search = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.SEARCH, param, null, callback);
};

Topic.prototype.nextPage = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.NEXT_PAGE, param, null, callback);
};

Topic.prototype.follow = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.FOLLOW, param, null, callback);
};

Topic.prototype.unfollow = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.UNFOLLOW, param, null, callback);
};

Topic.prototype.following = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.FOLLOWING, param, null, callback);
};

Topic.prototype.followers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.CommunityService.Topic.FOLLOWERS, param, null, callback);
};

Blob.prototype.writeBlob = function(param, callback, percentCallback) {
    this.pipe.blobSendRequest(this.Enum.Command.BlobService.Blob.WRITE_BLOB, param, null, callback, percentCallback);
};

Blob.prototype.readBlob = function(param, callback, percentCallback) {
    this.pipe.blobReceiveRequest(
        this.Enum.Command.BlobService.Blob.READ_BLOB,
        param,
        null,
        function(error, result, payload, roundTripTime, serverLatency) {
            var innerResult = {
                file: result.Context
            };
            innerResult.file.blobId = result.blobId;

            callback(error, innerResult, payload, roundTripTime, serverLatency);
        },
        percentCallback);
};

Blob.prototype.writeChunk = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.BlobService.Blob.WRITE_CHUNK, param, null, callback);
};

Blob.prototype.readChunk = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.BlobService.Blob.READ_CHUNK, param, null, callback);
};
},{"./commands":1,"./helpers/enum":2,"./helpers/messageHelper":3}]},{},[4])(4)
});