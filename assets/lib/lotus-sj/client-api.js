(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ClientAPI = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * @copyright Unseen, Inc.
 */

/* System generated file. Do not modify. */

'option strict';

module.exports = {
    Key: {
        ZiwmRN: "AccountService.Account.UPDATE_TIME_OFFSET",
        ZrXcdC: "AccountService.Account.CREATE",
        "1dxLqj": "AccountService.Account.ADD_DEVICE",
        Z25JlU4: "AccountService.Account.SET_GOSSIP_USER",
        Z2knq7O: "AccountService.Account.DELETE_USER",
        "2ktRO2": "AccountService.Account.UPDATE_AVATAR",
        Z1QQ5aO: "AccountService.Account.PHONE_NUMBER_EXISTS",
        ZUvt6s: "AccountService.Account.GET_USER_BY_PHONE_NUMBER",
        Z5Ey8d: "AccountService.Account.GET_USERS_BY_ID",
        U1nDK: "AccountService.Account.CHECK_GOSSIP_CONTACTS",
        Xia1n: "AccountService.Account.VERIFY_PHONE_NUMBER_SMS",
        Z2kzDl9: "AccountService.Account.CONFIRM_PHONE_NUMBER_SMS",
        "1lca5i": "AccountService.Session.LOGIN",
        "1VwXDh": "AccountService.Session.TOKEN_LOGIN",
        "15zYL8": "AccountService.Session.LOGOUT",
        wXk9b: "RosterService.Roster.ADD_PARTNER",
        ZjcMmD: "RosterService.Roster.REMOVE_PARTNER",
        "1DO2b4": "RosterService.Roster.GET_PARTNERS",
        F7qst: "RosterService.Roster.GET_ONLINE_PARTNERS",
        LwItf: "RosterService.Roster.SEARCH_PARTNERS",
        "1JLnKN": "RosterService.Roster.ADD_PARTNERS_BY_EMAIL",
        "292l2t": "RosterService.Roster.UPDATE_USER_BY_EMAIL",
        ZhoJBd: "RosterService.Roster.DELETE_PROFILE",
        Z15GpTT: "RosterService.Roster.On.PARTNER_ADDED",
        Zvzc7i: "RosterService.Roster.On.PARTNER_REMOVED",
        Z25mgup: "RosterService.Roster.On.PARTNER_UPDATED",
        Ku4dK: "RosterService.Group.CREATE",
        "2w5E1f": "RosterService.Group.GET_GROUP_BY_ID",
        Z2oy2aA: "RosterService.Group.GET_USER_GROUPS",
        "20q9rI": "RosterService.Group.ADD_MEMBERS",
        Zr09xS: "RosterService.Group.REMOVE_MEMBERS",
        G5W1q: "RosterService.Group.LEAVE",
        LHeJN: "RosterService.Group.DELETE",
        "2ekgDN": "RosterService.Group.On.CREATE_GROUP",
        Z1Q6Qzn: "RosterService.Group.On.ADD_MEMBERS",
        Zn54Qu: "RosterService.Group.On.REMOVE_MEMBERS",
        ZrfzYd: "RosterService.Group.On.ADDED_TO_GROUP",
        Afl9G: "RosterService.Group.On.LEAVE_GROUP",
        "1oPVLd": "RosterService.Group.On.REMOVED_FROM_GROUP",
        Zttmp0: "RosterService.Group.On.DELETE_GROUP",
        Z1AvarY: "MessageService.Message.SEND",
        "1NvRfN": "MessageService.Message.UPDATE_CONTENT",
        Zd4Kae: "MessageService.Message.UPDATE_STATUS",
        XV4Up: "MessageService.Message.GET_ALL_BY_CONVERSATION",
        aGy2p: "MessageService.Message.GET_PREVIOUS_BLOCK_BY_CONVERSATION",
        "3g30v": "MessageService.Message.GET_NEXT_BLOCK_BY_CONVERSATION",
        "2evhQT": "MessageService.Message.GET_UNREAD_MESSAGE_COUNT",
        "1hqM8z": "MessageService.Message.SET_UNREAD_MESSAGE_COUNT",
        ZWXiLo: "MessageService.Message.DELETE",
        ZL3zr5: "MessageService.Message.On.RECEIVE_MESSAGE",
        Z7qpGR: "MessageService.Message.On.UNREAD_MESSAGE_COUNT",
        ZcIDQa: "MessageService.Conversation.GET",
        Z1XWOrI: "MessageService.Conversation.HISTORY",
        Z2mOiRC: "MessageService.Conversation.GET_PREVIOUS_BLOCK_BY_USER",
        jA65H: "MessageService.Conversation.GET_NEXT_BLOCK_BY_USER",
        "16Ak8P": "MessageService.Conversation.DELETE",
        "1enrcc": "MessageService.File.UPLOAD_BLOB",
        Z1aFcHL: "MessageService.File.DOWNLOAD_BLOB",
        Z28fqpI: "NotificationService.PushWoosh.SEND"
    },
    GlobalSessionService: {},
    CentralAuthenticationService: {},
    SmsService: {},
    AccountService: {
        Account: {
            UPDATE_TIME_OFFSET: "ZiwmRN",
            CREATE: "ZrXcdC",
            ADD_DEVICE: "1dxLqj",
            SET_GOSSIP_USER: "Z25JlU4",
            DELETE_USER: "Z2knq7O",
            UPDATE_AVATAR: "2ktRO2",
            PHONE_NUMBER_EXISTS: "Z1QQ5aO",
            GET_USER_BY_PHONE_NUMBER: "ZUvt6s",
            GET_USERS_BY_ID: "Z5Ey8d",
            CHECK_GOSSIP_CONTACTS: "U1nDK",
            VERIFY_PHONE_NUMBER_SMS: "Xia1n",
            CONFIRM_PHONE_NUMBER_SMS: "Z2kzDl9"
        },
        Session: {
            LOGIN: "1lca5i",
            TOKEN_LOGIN: "1VwXDh",
            LOGOUT: "15zYL8"
        }
    },
    RosterService: {
        Roster: {
            ADD_PARTNER: "wXk9b",
            REMOVE_PARTNER: "ZjcMmD",
            GET_PARTNERS: "1DO2b4",
            GET_ONLINE_PARTNERS: "F7qst",
            SEARCH_PARTNERS: "LwItf",
            ADD_PARTNERS_BY_EMAIL: "1JLnKN",
            UPDATE_USER_BY_EMAIL: "292l2t",
            DELETE_PROFILE: "ZhoJBd",
            On: {
                PARTNER_ADDED: "Z15GpTT",
                PARTNER_REMOVED: "Zvzc7i",
                PARTNER_UPDATED: "Z25mgup"
            }
        },
        Group: {
            CREATE: "Ku4dK",
            GET_GROUP_BY_ID: "2w5E1f",
            GET_USER_GROUPS: "Z2oy2aA",
            ADD_MEMBERS: "20q9rI",
            REMOVE_MEMBERS: "Zr09xS",
            LEAVE: "G5W1q",
            DELETE: "LHeJN",
            On: {
                CREATE_GROUP: "2ekgDN",
                ADD_MEMBERS: "Z1Q6Qzn",
                REMOVE_MEMBERS: "Zn54Qu",
                ADDED_TO_GROUP: "ZrfzYd",
                LEAVE_GROUP: "Afl9G",
                REMOVED_FROM_GROUP: "1oPVLd",
                DELETE_GROUP: "Zttmp0"
            }
        }
    },
    MessageService: {
        Message: {
            SEND: "Z1AvarY",
            UPDATE_CONTENT: "1NvRfN",
            UPDATE_STATUS: "Zd4Kae",
            GET_ALL_BY_CONVERSATION: "XV4Up",
            GET_PREVIOUS_BLOCK_BY_CONVERSATION: "aGy2p",
            GET_NEXT_BLOCK_BY_CONVERSATION: "3g30v",
            GET_UNREAD_MESSAGE_COUNT: "2evhQT",
            SET_UNREAD_MESSAGE_COUNT: "1hqM8z",
            DELETE: "ZWXiLo",
            On: {
                RECEIVE_MESSAGE: "ZL3zr5",
                UNREAD_MESSAGE_COUNT: "Z7qpGR"
            }
        },
        Conversation: {
            GET: "ZcIDQa",
            HISTORY: "Z1XWOrI",
            GET_PREVIOUS_BLOCK_BY_USER: "Z2mOiRC",
            GET_NEXT_BLOCK_BY_USER: "jA65H",
            DELETE: "16Ak8P"
        },
        File: {
            UPLOAD_BLOB: "1enrcc",
            DOWNLOAD_BLOB: "Z1aFcHL"
        }
    },
    NotificationService: {
        PushWoosh: {
            SEND: "Z28fqpI"
        }
    }
};
},{}],2:[function(require,module,exports){
/*
 * @copyright unseen, ehf
 */

'option strict';

module.exports = {
	Command: {
		SEND_ONE: 'send-one',
		SEND_GROUP: 'send-group',
		CALL_AUDIO: 'call-audio',
		CALL_VIDEO: 'call-video'
	},

	Message: {
		Type: {
			CHAT: 'one',
			GROUP_CHAT: 'group'
		},

		Format: {
			TEXT: 'text',
			PHOTO: 'photo'
		}
	}
}
},{}],3:[function(require,module,exports){
/*
 * @copyright Unseen, ehf
 */

'option strict';

var Enum = undefined;

module.exports = MessageHelper;

function MessageHelper(DataObject, Blob) {
	Enum = require('./enum');
	this.DataObject = DataObject;
	this.Blob = Blob;
}

MessageHelper.prototype.toGossipConversations = function(error, result) {
	var gosssipRows = [];

	if (!error && result) {
		var rows = null,
			row = null,
			index = null,
			mapStats = {},
			mapTotalStats = {},
			mapMessageIds = {},
			key = null;

		rows = result.messageStats || [];
		index = rows.length;
		if (index) {
			while (index--) {
				row = rows[index];
				key = row.user_id + ':' + row.conv_id;

				if (row.conv_id == 'total') {
					mapTotalStats[key] = row;

				} else {
					mapStats[key] = row;
				}
			}
		}

		rows = result.messageIds || [];
		index = rows.length;
		if (index) {
			while (index--) {
				row = rows[index];
				key = row.user_id + ':' + row.conv_id;
				mapMessageIds[key] = row;
			}
		}

		rows = result.rows || [];
		index = rows.length;
		while (index--) {
			row = rows[index];
			key = row.user_id + ':' + row.conv_id;

			if (mapMessageIds[key]) {
				row.last_read_message_id = mapMessageIds[key].last_read_message_id;
			} else {
				row.last_read_message_id = null;
			}

			if (mapStats[key]) {
				row.unread_message_count = parseInt(mapStats[key].unread_message_count);
			} else {
				row.unread_message_count = 0;
			}

			key = row.user_id + ':total';
			if (mapTotalStats[key]) {
				row.unread_message_total = parseInt(mapTotalStats[key].unread_message_count);
			} else {
				row.unread_message_total = 0;
			}

			gosssipRows.unshift(this.toGossipConversation(null, row));
		}
		result = {
			data: result.data,
			rows: gosssipRows
		};
	}

	return result;
}

MessageHelper.prototype.toGossipConversation = function(error, conversation) {
	if (!error) {
		return this.toGossipConversationId(conversation);
	}
}

MessageHelper.prototype.toGossipMessages = function(error, result) {
	var rows = [];

	if (!error && result) {
		var index = result.rows.length;
		while (index--) {
			rows.unshift(this.toGossipMessage(null, result.rows[index]));
		}

		result.rows = rows;
		result.data = this.toGossipConversationId(result.data);
	}

	return result;
};

MessageHelper.prototype.toGossipMessage = function(error, data) {
	if (!error) {
		var gossipMessage = {
			message_type: data.message_type,
			message_format: data.message_format,
			status: data.status,
			message_id: data.message_id,
			created_time: data.created_time,
			sender_id: data.sender_id,
			sender_display_name: data.sender_display_name,
			content: data.content,
			file_token: data.file_token,
			no_save_message: data.no_save_message || 0
		};

		switch (data.message_type) {
			case Enum.Message.Type.CHAT:
				gossipMessage.receiver_id = data.receiver_id;
				gossipMessage.receiver_display_name = data.receiver_display_name;
				break;

			case Enum.Message.Type.GROUP_CHAT:
				gossipMessage.group_id = data.receiver_id;
				gossipMessage.group_name = data.receiver_display_name;
				break;
		}

		gossipMessage.conv_id = this._getGossipConversationId(gossipMessage);

		return gossipMessage;
	}
}

MessageHelper.prototype.toGossipConversationId = function(param) {
	if (param) {
		var parts = param.conv_id.split(':'),
			data = {
				message_type: parts[0],
				sender_id: param.sender_id || param.user_id
			};

		switch (data.message_type) {
			case Enum.Message.Type.CHAT:
				data.receiver_id = (data.sender_id == parts[2]) ? parts[1] : parts[2];
				break;

			case Enum.Message.Type.GROUP_CHAT:
				data.group_id = parts[1];
				break;
		}

		param.conv_id = this._getGossipConversationId(data);
		delete param.sender_id;
	}
	
	return param;
}

MessageHelper.prototype._getGossipConversationId = function(data) {
	switch (data.message_type) {
		case Enum.Message.Type.CHAT:
			return data.sender_id + ':to:' + data.message_type + ':' + data.receiver_id;
			break;

		case Enum.Message.Type.GROUP_CHAT:
			return data.sender_id + ':to:' + data.message_type + ':' + data.group_id;
			break;
	}
}

MessageHelper.prototype.toConversationId = function(param) {
	var parts = param.conv_id.split(':'),
		data = {
			message_type: parts[2],
			sender_id: parts[0],
			receiver_id: parts[3],
			group_id: parts[3]
		};

	param.sender_id = data.sender_id;
	param.conv_id = this._getConversationId(data);

	return param;
}

MessageHelper.prototype._getConversationId = function(data) {
	switch (data.message_type) {
		case Enum.Message.Type.CHAT:
			if (data.sender_id > data.receiver_id) {
				return data.message_type + ':' + data.receiver_id + ':' + data.sender_id;

			} else {
				return data.message_type + ':' + data.sender_id + ':' + data.receiver_id;
			}
			break;

		case Enum.Message.Type.GROUP_CHAT:
			return data.message_type + ':' + data.group_id;
			break;
	}
}

MessageHelper.prototype.newMessage = function(data) {
	switch (data.message_type) {
		case Enum.Message.Type.CHAT:
			return this._chatMessage(data);
			break;

		case Enum.Message.Type.GROUP_CHAT:
			return this._groupChatMessage(data);
			break;
	}
}

MessageHelper.prototype._chatMessage = function(data) {
	return {
		param: {
			message_id: data.message_id,
			created_time: data.created_time,
			message_type: data.message_type,
			message_format: data.message_format,
			status: data.status,
			sender_id: data.sender_id,
			sender_display_name: data.sender_display_name,
			receiver_id: data.receiver_id,
			receiver_display_name: data.receiver_display_name,
			receiver_members: [data.receiver_id],
			content: data.content,
			conv_id: this._getConversationId(data),
			preview_text: data.preview_text,
			file_token: data.file_token,
			no_save_message: data.no_save_message || 0

		}
	}
}

MessageHelper.prototype._groupChatMessage = function(data) {
	return {
		param: {
			message_id: data.message_id,
			created_time: data.created_time,
			message_type: data.message_type,
			message_format: data.message_format,
			status: data.status,
			sender_id: data.sender_id,
			sender_display_name: data.sender_display_name,
			receiver_id: data.group_id,
			receiver_display_name: data.group_name,
			receiver_members: [],
			content: data.content,
			conv_id: this._getConversationId(data),
			preview_text: data.preview_text,
			file_token: data.file_token,
			no_save_message: data.no_save_message || 0
		}
	}
}

MessageHelper.prototype.toBuffer = function(body) {
	var bodyObject = this.DataObject.fromValue(body);

	return new this.Blob()
		.startWrite()
		.writeNext(bodyObject)
		.endWrite();
}

MessageHelper.prototype.fromBuffer = function(buffer) {
	return new this.Blob()
		.startRead(buffer)
		.readNext()
		.value();
}
},{"./enum":2}],4:[function(require,module,exports){
/*
 * @copyright Safe Cash Payment Technologies, Inc.
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
    MessageHelper = require('./helpers/messageHelper');

module.exports = API;

function API(pipe) {
    this.version = '1.3.1';
    this.pipe = pipe;
    this.pipe.Enum.Command = Commands;
    this.GlobalSessionService = new GlobalSessionService(this.pipe);
    this.SmsService = new SmsService(this.pipe);
    this.AccountService = new AccountService(this.pipe);
    this.RosterService = new RosterService(this.pipe);
    this.MessageService = new MessageService(this.pipe);
    this.CentralAuthenticationService = new CentralAuthenticationService(this.pipe);
    this.NotificationService = new NotificationService(this.pipe);
};

function GlobalSessionService(pipe) {};

function CentralAuthenticationService(pipe) {};

function SmsService(pipe) {};

function AccountService(pipe) {
    this.Account = new Account(pipe);
    this.Session = new Session(pipe);
};

function Account(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Session(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function RosterService(pipe) {
    this.Roster = new Roster(pipe);
    this.Group = new Group(pipe);
};

function Roster(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function Group(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function MessageService(pipe) {
    this.Message = new Message(pipe);
    this.Conversation = new Conversation(pipe);
    this.File = new File(pipe);
};

function Message(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;

    this.messageHelper = new MessageHelper(
        this.pipe.Components.ClientRequest.DataObject,
        this.pipe.Components.ClientRequest.Blob
    );
};

function Conversation(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;

    this.messageHelper = new MessageHelper(
        this.pipe.Components.ClientRequest.DataObject,
        this.pipe.Components.ClientRequest.Blob
    );
};

function File(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

function NotificationService(pipe) {
    this.PushWoosh = new PushWoosh(pipe);
};

function PushWoosh(pipe) {
    this.pipe = pipe;
    this.Enum = this.pipe.Enum;
};

Account.prototype.updateTimeOffset = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.UPDATE_TIME_OFFSET, param, null, callback);
};

Account.prototype.create = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.CREATE, param, null, callback);
};

Account.prototype.addDevice = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.ADD_DEVICE, param, null, callback);
};

Account.prototype.setGossipUser = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.SET_GOSSIP_USER, param, null, callback);
};

Account.prototype.deleteUser = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.DELETE_USER, param, null, callback);
};

Account.prototype.updateAvatar = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.UPDATE_AVATAR, param, null, callback);
};

Account.prototype.phoneNumberExists = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.PHONE_NUMBER_EXISTS, param, null, callback);
};

Account.prototype.getUserByPhoneNumber = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.GET_USER_BY_PHONE_NUMBER, param, null, callback);
};

Account.prototype.getUsersById = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.GET_USERS_BY_ID, param, null, callback);
};

Account.prototype.checkGossipContacts = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.CHECK_GOSSIP_CONTACTS, param, null, callback);
};

Account.prototype.verifyPhoneNumberSms = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.VERIFY_PHONE_NUMBER_SMS, param, null, callback);
};

Account.prototype.confirmPhoneNumberSms = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Account.CONFIRM_PHONE_NUMBER_SMS, param, null, callback);
};

Session.prototype.login = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.LOGIN, param, null, callback);
};

Session.prototype.tokenLogin = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.TOKEN_LOGIN, param, null, callback);
};

Session.prototype.logout = function(callback) {
    this.pipe.sendRequest(this.Enum.Command.AccountService.Session.LOGOUT, null, null, callback);
};

Roster.prototype.addPartner = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.ADD_PARTNER, param, null, callback);
};

Roster.prototype.removePartner = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.REMOVE_PARTNER, param, null, callback);
};

Roster.prototype.getPartners = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.GET_PARTNERS, param, null, callback);
};

Roster.prototype.getOnlinePartners = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.GET_ONLINE_PARTNERS, param, null, callback);
};

Roster.prototype.searchPartners = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.SEARCH_PARTNERS, param, null, callback);
};

Roster.prototype.addPartnersByEmail = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.ADD_PARTNERS_BY_EMAIL, param, null, callback);
};

Roster.prototype.updateUserByEmail = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.UPDATE_USER_BY_EMAIL, param, null, callback);
};

Roster.prototype.deleteProfile = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Roster.DELETE_PROFILE, param, null, callback);
};

Roster.prototype.onPartnerAdded = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Roster.On.PARTNER_ADDED, callback);
};

Roster.prototype.onPartnerRemoved = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Roster.On.PARTNER_REMOVED, callback);
};

Roster.prototype.onPartnerUpdated = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Roster.On.PARTNER_UPDATED, callback);
};

Group.prototype.create = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.CREATE, param, null, callback);
};

Group.prototype.getGroupById = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.GET_GROUP_BY_ID, param, null, callback);
};

Group.prototype.getUserGroups = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.GET_USER_GROUPS, param, null, callback);
};

Group.prototype.addMembers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.ADD_MEMBERS, param, null, callback);
};

Group.prototype.removeMembers = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.REMOVE_MEMBERS, param, null, callback);
};

Group.prototype.leave = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.LEAVE, param, null, callback);
};

Group.prototype.delete = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.RosterService.Group.DELETE, param, null, callback);
};

Group.prototype.onCreateGroup = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.CREATE_GROUP, callback);
};

Group.prototype.onAddMembers = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.ADD_MEMBERS, callback);
};

Group.prototype.onRemoveMembers = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.REMOVE_MEMBERS, callback);
};

Group.prototype.onAddedToGroup = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.ADDED_TO_GROUP, callback);
};

Group.prototype.onLeaveGroup = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.LEAVE_GROUP, callback);
};

Group.prototype.onRemovedFromGroup = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.REMOVED_FROM_GROUP, callback);
};

Group.prototype.onDeleteGroup = function(callback) {
    this.pipe.on(this.Enum.Command.RosterService.Group.On.DELETE_GROUP, callback);
};

Message.prototype.send = function(param, callback) {
    var self = this,
        message = this.messageHelper.newMessage(param);

    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.SEND,
        message.param, null,
        function(error, result, payload, roundTripTime, serverLatency) {
            result = self.messageHelper.toGossipConversationId(result);
            callback(error, result, payload, roundTripTime, serverLatency);
        }
    );
};

Message.prototype.updateContent = function(param, body, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.UPDATE_CONTENT, param, body, callback);
};

Message.prototype.updateStatus = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.UPDATE_STATUS, param, null, callback);
};

Message.prototype.getAllByConversation = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.GET_ALL_BY_CONVERSATION, param, null, callback);
};

Message.prototype.getPreviousBlockByConversation = function(param, callback) {
    var self = this;
    param = this.messageHelper.toConversationId(param);

    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.GET_PREVIOUS_BLOCK_BY_CONVERSATION, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        callback(error, self.messageHelper.toGossipMessages(error, payload), null, roundTripTime, serverLatency);
    });
};

Message.prototype.getNextBlockByConversation = function(param, callback) {
    var self = this;
    param = this.messageHelper.toConversationId(param);

    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.GET_NEXT_BLOCK_BY_CONVERSATION, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        callback(error, self.messageHelper.toGossipMessages(error, payload), null, roundTripTime, serverLatency);
    });
};

Message.prototype.getUnreadMessageCount = function(param, callback) {
    param.conv_id = this.messageHelper.toConversationId(param).conv_id;
    delete param.sender_id;

    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.GET_UNREAD_MESSAGE_COUNT, param, null, callback);
};

Message.prototype.setUnreadMessageCount = function(param, callback) {
    var self = this;
    param = this.messageHelper.toConversationId(param);

    this.pipe.sendRequest(
        this.Enum.Command.MessageService.Message.SET_UNREAD_MESSAGE_COUNT,
        param, null,
        function(error, result, payload, roundTripTime, serverLatency) {
            result = self.messageHelper.toGossipConversationId(result);
            callback(error, result, payload, roundTripTime, serverLatency);
        }
    );
};

Message.prototype.delete = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Message.DELETE, param, null, callback);
};

Message.prototype.onReceiveMessage = function(callback) {
    var self = this;
    this.pipe.on(
        this.Enum.Command.MessageService.Message.On.RECEIVE_MESSAGE,
        function(error, result, payload, roundTripTime, serverLatency) {
            callback(error, self.messageHelper.toGossipMessage(error, result), roundTripTime, serverLatency);
        }
    );
};

Message.prototype.onUnreadMessageCount = function(callback) {
    var self = this;
    this.pipe.on(
        this.Enum.Command.MessageService.Message.On.UNREAD_MESSAGE_COUNT,
        function(error, result, payload, roundTripTime, serverLatency) {
            result = self.messageHelper.toGossipConversationId(result);
            callback(error, result, payload, roundTripTime, serverLatency);
        }
    );
};

Conversation.prototype.get = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Conversation.GET, param, null, callback);
};

Conversation.prototype.history = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.MessageService.Conversation.HISTORY, param, null, callback);
};

Conversation.prototype.getPreviousBlockByUser = function(param, callback) {
    var self = this;
    this.pipe.sendRequest(this.Enum.Command.MessageService.Conversation.GET_PREVIOUS_BLOCK_BY_USER, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        callback(error, self.messageHelper.toGossipConversations(error, payload), null, roundTripTime, serverLatency);
    });
};

Conversation.prototype.getNextBlockByUser = function(param, callback) {
    var self = this;
    this.pipe.sendRequest(this.Enum.Command.MessageService.Conversation.GET_NEXT_BLOCK_BY_USER, param, null, function(error, result, payload, roundTripTime, serverLatency) {
        callback(error, self.messageHelper.toGossipConversations(error, payload), null, roundTripTime, serverLatency);
    });
};

Conversation.prototype.delete = function(param, callback) {
    this.messageHelper.toConversationId(param);
    this.pipe.sendRequest(this.Enum.Command.MessageService.Conversation.DELETE, param, null, callback);
};

File.prototype.uploadBlob = function(param, payload, callback, percentCallback) {
    this.pipe.sendBlobRequest(this.Enum.Command.MessageService.File.UPLOAD_BLOB, param, payload, callback, percentCallback);
};

File.prototype.downloadBlob = function(param, callback, percentCallback) {
    this.pipe.receiveFileRequest(this.Enum.Command.MessageService.File.DOWNLOAD_BLOB, param, callback, percentCallback);
};

PushWoosh.prototype.send = function(param, callback) {
    this.pipe.sendRequest(this.Enum.Command.NotificationService.PushWoosh.SEND, param, null, callback);
};
},{"./commands":1,"./helpers/messageHelper":3}]},{},[4])(4)
});