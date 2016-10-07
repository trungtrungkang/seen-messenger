'option strict';

Enum = {
	Message: {
		Type: {
			ONE: 'one',
			GROUP: 'group',
			SECRET: 'secret'
		},

		Format: {
			PHOTO: 'photo'
		}
	}
};


function print(title, error, result, payload, roundTripTime, serverLatency) {
	if (Andaman.client.config.mode === Andaman.Enum.Mode.DEV) {
		console.log(
			title + '()',
			'- error:', error,
			', result:', result,
			', payload:', payload,
			', roundTripTime:', roundTripTime, 'ms',
			', serverLatency:', serverLatency, 'ms'
		);
	}
};

function getResponse(error, result) {
	var response = {
		err: error,
		re: result || null
	};
	console.log(response);
	return response;
}

var API = undefined,
	Andaman = {
		_is_ready: false,
		_ready_callbacks: [],
		_args: null,

		Enum: ClientIO.Enum,

		init: function(config) {
			Andaman.client = new Client(config, ClientIO, ClientAPI);
			API = Andaman.client.API;
			Andaman.session_id = Andaman.client.sessionId;
		},

		ready: function(callback) {
			var cb = callback.bind(this); //change context
			cb();
		},

		info: function() {
			if (Andaman.client.config.mode === Andaman.Enum.Mode.DEV) {
				console.log('/********************************************************************/');
				console.log('Session ID: ', Andaman.session_id);
				console.log('API: ', Andaman.client.API.version);
				console.log('Config:', Andaman.client.config);
				console.log('Enum:', Andaman.Enum);
				console.log('/********************************************************************/');
			}
		},

		rosters: {},
		groups: {},
		messages: {},
		conversations: {}
	};

// General
Andaman.update_time_offset = function(local_time, callback) {
	var data = {
		client_time: local_time
	};

	API.AccountService.Account.updateTimeOffset(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#update_time_offset', error, result, payload, roundTripTime, serverLatency)

		var resp = result.offset;
		callback(error, resp);
	});
};

Andaman.verify_phone_number = function(number, callback) {
	var data = {
		number: number
	};

	API.AccountService.Account.verifyPhoneNumberSms(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#verify_phone_number', error, result, payload, roundTripTime, serverLatency)
		callback(result);
	});
};

Andaman.verify_confirm_code = function(data, callback) {
	API.AccountService.Account.confirmPhoneNumberSms(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#verify_confirm_code', error, result, payload, roundTripTime, serverLatency)
		callback(result);
	});
};


// Users
Andaman.create_user = function(data, callback) {
	API.AccountService.Account.create(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#create_user', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.login = function(data, callback) {
	data.session_id = Andaman.session_id;
	API.AccountService.Session.login(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#login', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.token_login = function(data, callback) {
	data.session_id = Andaman.session_id;
	API.AccountService.Session.tokenLogin(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#token_login', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.update_avatar = function(data, callback) {
	API.AccountService.Account.updateAvatar(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#update_avatar', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

Andaman.is_gossip_contacts = function(contacts, callback) {
	var data = {
		contacts: contacts
	}
	API.AccountService.Account.checkGossipContacts(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#is_gossip_contacts', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.get_user_by_phone_number = function(data, callback) {
	API.AccountService.Account.getUserByPhoneNumber(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_user_by_phone_number', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.get_user_by_id = function(data, callback) {
	API.AccountService.Account.getUsersById(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_user_by_id', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.set_gossip_user = function(data, callback) {
	API.AccountService.Account.setGossipUser(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#set_gossip_user', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

Andaman.logout = function(callback) {
	API.AccountService.Session.logout(function(error, result, payload, roundTripTime, serverLatency) {
		print('#logout', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

// Rosters
Andaman.rosters.add = function(data, callback) {
	API.RosterService.Roster.addPartner(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#add', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.rosters.on_partner_added = function(callback) {
	API.RosterService.Roster.onPartnerAdded(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_partner_added', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.rosters.remove = function(data, callback) {
	API.RosterService.Roster.removePartner(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#remove', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

Andaman.rosters.on_partner_removed = function(callback) {
	API.RosterService.Roster.onPartnerRemoved(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_partner_removed', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.rosters.update = function(data, callback) {
	API.RosterService.Roster.updateUserByEmail(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#updateUser', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

Andaman.rosters.on_partner_updated = function(callback) {
	API.RosterService.Roster.onPartnerUpdated(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_partner_updated', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.rosters.get_roster = function(data, callback) {
	API.RosterService.Roster.getPartners(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_roster', error, result, payload, roundTripTime, serverLatency)
		if (payload) payload = payload.roster
		callback(getResponse(error, result || payload));
	});
};

Andaman.rosters.get_online_roster = function(data, callback) {
	API.RosterService.Roster.getOnlinePartners(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_online_roster', error, result, payload, roundTripTime, serverLatency)
		if (payload) payload = payload.roster
		callback(getResponse(error, result || payload));
	});
};

Andaman.rosters.search_roster = function(data, callback) {
	API.RosterService.Roster.searchPartners(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#search_roster', error, result, payload, roundTripTime, serverLatency)
		if (payload) payload = payload.roster
		callback(getResponse(error, result || payload));
	});
};

Andaman.rosters.delete_profile = function(data, callback) {
	API.RosterService.Roster.deleteProfile(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#delete_profile', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

// groups
Andaman.groups.create = function(data, callback) {
	API.RosterService.Group.create(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#create', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.get_group_by_id = function(data, callback) {
	API.RosterService.Group.getGroupById(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_group_by_id', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.get_groups_by_user = function(data, callback) {
	API.RosterService.Group.getUserGroups(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_groups_by_user', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.add_members = function(data, callback) {
	API.RosterService.Group.addMembers(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#add_members', error, result, payload, roundTripTime, serverLatency)

		var resp = {
			message: "Add members OK",
			current_members: result.current_members,
			new_members: result.new_members
		};
		callback(getResponse(error, resp));
	});
};

Andaman.groups.remove_members = function(data, callback) {
	API.RosterService.Group.removeMembers(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#remove_members', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.leave = function(data, callback) {
	API.RosterService.Group.leave(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#leave', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

Andaman.groups.delete = function(data, callback) {
	API.RosterService.Group.delete(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#delete', error, result, payload, roundTripTime, serverLatency)
		var resp = {
			message: "Delete group OK",
			removed_members: result.removed_members
		};
		callback(getResponse(error, resp));
	});
};

Andaman.groups.on_receiver_create_group = function(callback) {
	API.RosterService.Group.onCreateGroup(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_ceate_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_added_to_group = function(callback) {
	API.RosterService.Group.onAddedToGroup(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_join_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_removed_from_group = function(callback) {
	API.RosterService.Group.onRemovedFromGroup(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_removed_from_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_add_members = function(callback) {
	API.RosterService.Group.onAddMembers(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_add_member_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_remove_members = function(callback) {
	API.RosterService.Group.onRemoveMembers(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_remove_member_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_leave_group = function(callback) {
	API.RosterService.Group.onLeaveGroup(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_leave_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.groups.on_receiver_delete_group = function(callback) {
	API.RosterService.Group.onDeleteGroup(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_receiver_delete_group', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};


// Messages
Andaman.messages.send = function(data, callback) {
	API.MessageService.Message.send(
		data,
		function(error, result, payload, roundTripTime, serverLatency) {
			print('#send', error, result, payload, roundTripTime, serverLatency)

			callback(getResponse(error, result));
		}
	);
};

Andaman.messages.on_receive_message_one = function(callback) {
	API.MessageService.Message.onReceiveMessage(function(error, message, roundTripTime, serverLatency) {
		print('#on_receive_message_one', error, message, null, roundTripTime, serverLatency)
		callback(message);
	});
};

Andaman.messages.on_unread_message_count = function(callback) {
	API.MessageService.Message.onUnreadMessageCount(function(error, result, payload, roundTripTime, serverLatency) {
		print('#on_unread_message_count', error, result, payload, roundTripTime, serverLatency)
		callback(result);
	});
};

Andaman.messages.get_unread_message_count = function(data, callback) {
	API.MessageService.Message.getUnreadMessageCount(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_unread_message_count', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.messages.set_unread_message_count = function(data, callback) {
	API.MessageService.Message.setUnreadMessageCount(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#set_unread_message_count', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.messages.get_previous_block_by_conversation = function(data, callback) {
	API.MessageService.Message.getPreviousBlockByConversation(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_previous_block_by_conversation', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.messages.get_next_block_by_conversation = function(data, callback) {
	API.MessageService.Message.getNextBlockByConversation(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#get_next_block_by_conversation', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};


// Conversations
Andaman.conversations.conv_get_previous_block_by_user = function(data, callback) {
	API.MessageService.Conversation.getPreviousBlockByUser(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#conv_get_previous_block_by_user', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.conversations.conv_get_next_block_by_user = function(data, callback) {
	API.MessageService.Conversation.getNextBlockByUser(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#conv_get_next_block_by_user ', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error, result));
	});
};

Andaman.conversations.delete_conv = function(data, callback) {
	API.MessageService.Conversation.delete(data, function(error, result, payload, roundTripTime, serverLatency) {
		print('#delete_conv ', error, result, payload, roundTripTime, serverLatency)
		callback(getResponse(error));
	});
};

// Files
/*
	result = {
		token:
	}
 */
Andaman.upload_file_xfer = function(file, percent_callback, callback) {
	var context = null;
	var array_buffer = null;
	if (file && file.context) {
		context = file.context;
	}
	if (file && file.array_buffer) {
		array_buffer = file.array_buffer;
	}
	if (context && context.lastModifiedDate) {
		context.modified = context.lastModifiedDate;
		delete context.lastModifiedDate;
	}

	API.MessageService.File.uploadBlob(
		context,
		array_buffer,

		function(error, result, payload, roundTripTime, serverLatency) {
			print('#upload_file_xfer ', error, result, payload, roundTripTime, serverLatency)
			callback(getResponse(error, result));
		},

		function(error, result) {
			if (error) {
				console.log(error);
			}

			percent_callback(result.percent);
		}
	);
};

Andaman.download_file = function(token, percent_callback, callback) {
	var data = {
		token: token
	};

	API.MessageService.File.downloadBlob(
		data,

		function(error, result, payload, roundTripTime, serverLatency) {
			print('#download_file ', error, result, payload, roundTripTime, serverLatency);

			if (!error) {
				var file_info = {
					created_time: result.created_time,
					file_context: result.context,
					result: payload
				};

				callback(getResponse(null, file_info));

			} else {
				callback(getResponse(error));
			}
		},

		function(error, result) {
			if (error) {
				console.log(error);
			}

			percent_callback(result.percent);
		}
	);
};