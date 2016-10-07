/*
 * Unit test for Lotus client
 ************************************************/

var expect = chai.expect;
var assert = chai.assert;
var Lotus = null;

var Messages = {
	hello: 'Hello world',
	kb1: 'This is 1 kb - This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test messa',
	kb3: 'This is 3 kb - This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test messageThis is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message',
	kb5: 'This is 5 kb - This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test messageThis is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message This is a test message.',
};

function getUser(userNo) {
	var user = {
		name: 'User ' + userNo,
		email: 'user' + userNo + '@email.com',
		password: 'pwd',
		avatarUrl: '/avatar/url/user' + userNo,
		profileUrl: '/profile/url/user' + userNo,
		state: 0,
		status: 'Out to lunch',

		phone: userNo + '000000',
		deviceId: 'BROWSER',
		device: {
			name: 'device' + userNo,
			token: 'token-' + userNo
		}
	}

	return user;
};

function print(title, error, result, payload, roundTripTime, serverLatency) {
	if (Lotus.config.mode === Lotus.Enum.Mode.DEV) {
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

var conversationId = '4d7f38c0-48e6-11e6-aec6-be1948bc203b',
	messageId = null,
	blobId = null;

describe('Lotus APIs', function() {
	this.timeout(20000);
	this.slow(20);

	before(function(done) {
		var config = {
			mode: App.Enum.Mode.DEV,
			// serverProtocol: App.Enum.ServerProtocol.HTTPS,
			device: App.Enum.Device.WS,
			host: window.location.hostname,
			// port: 3000,
			// requestTimeoutSecs: 60
		};

		// config.host = '64.71.165.211';
		// config.host = '113.190.44.122';

		switch (config.host) {
			case '64.71.165.210':
			case '64.71.165.211':
			case '64.71.165.212':
				config.port = 80;
				break;

			case 'devchat.seen.life':
				config.serverProtocol = App.Enum.ServerProtocol.HTTPS;
				config.port = 443;
				break;

			default:
				config.port = 3001;
				break;

		}

		Lotus = App.init(config);
		Lotus.info();

		Lotus.start(function(status, response) {
			switch (status) {
				case Lotus.Enum.Status.CONNECTION_OPENED:
					done();
					break;

				case Lotus.Enum.Status.CONNECTION_CLOSED:
					break;

				case Lotus.Enum.Status.SESSION_RESTORED:
					break;

				case Lotus.Enum.Status.SESSION_UPDATED:
					break;

				case Lotus.Enum.Status.SESSION_FAILED:
					break;

			}

			if (Lotus.config.mode === Lotus.Enum.Mode.DEV) {
				console.log(status, response);
			}
		});
	});

	var user1 = getUser(1),
		user2 = getUser(2),
		user3 = getUser(3),
		user4 = getUser(4);

	user1.userId = 'f4c3b8c0-48ca-11e6-8a1e-5484fbb5a15c';
	user2.userId = 'ecd710d0-48ca-11e6-a7f3-7dec35c0b9f8';
	user3.userId = '8e3f6e00-48de-11e6-8ca0-3574257d2c7e';
	user4.userId = 'ac76df70-48de-11e6-a50c-ce1caa1a7243';

	var idToken = null,
		conversationId = null,
		deviceId = null;

	describe('Account and Session', function() {

		describe('#signUp', function() {
			var user = user2;
			it(user.name, function(done) {
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
			});
		});

		describe('#signIn', function() {
			var user = user1;
			it('signIn ' + user.name, function(done) {
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
			});
		});

		describe.skip('#seen.life', function() {
			var user = user1;
			it('seen.life ', function(done) {
				var param = {
					email: user.email,
					password: user.password,
					deviceId: user.deviceId,
				}

				Lotus.pipe.sendRequest('seen-command', param, null, function(error, result, payload, roundTripTime, serverLatency) {
					print('#seen.life', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				}, null, 'ZMQ_BUS');
			});
		});

		describe('#tokenSignIn', function() {
			it('tokenSignIn', function(done) {
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
			});
		});

		describe('#updateProfile', function() {
			it('updateProfile ' + user1.name, function(done) {
				var param = {
					name: 'Edited name',
					avatarUrl: 'edited/avatar/url',
					profileUrl: 'edited/avatar/url',
					privacyLevel: 1
				}
				Lotus.AccountService.Account.updateProfile(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#updateProfile', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#setState', function() {
			it('setState ' + user1.name, function(done) {
				var param = {
					state: user1.state,
					status: 'User status'
				}
				Lotus.AccountService.Session.setState(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#setState', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});
	});

	describe('Roster', function() {

		describe('#addPartner', function() {
			it(user2.name, function(done) {
				var param = {
					partnerEmail: user2.email
				}
				Lotus.AccountService.Roster.addPartner(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#addPartner', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#addPartner', function() {
			it(user3.name, function(done) {
				var param = {
					partnerEmail: user3.email
				}
				Lotus.AccountService.Roster.addPartner(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#addPartner', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#removePartner', function() {
			it(user2.name, function(done) {
				var param = {
					partnerEmail: user2.email
				}
				Lotus.AccountService.Roster.removePartner(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#removePartner', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#getOnlinePartners', function() {
			it(user1.name, function(done) {
				Lotus.AccountService.Roster.getOnlinePartners(function(error, result, payload, roundTripTime, serverLatency) {
					print('#getOnlinePartners', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					if (result.length) user2.userId = result[0].userId;
					done();
				});
			});
		});

	});

	describe('Conversation', function() {
		describe('#createOne', function() {
			it(user1.name, function(done) {
				var param = {
					title: 'First conversation',
					memberId: user2.userId
				}
				Lotus.ChatService.Conversation.createOne(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#createOne', error, result, payload, roundTripTime, serverLatency)
					assert.isTrue(!error || (error && error.code == 'Error.ChatService.Conversation.ONE_CONVERSATION_EXISTS'));
					done();
				});
			});
		});

		describe('#createGroup', function() {
			it(user1.name, function(done) {
				var param = {
					title: 'Second conversation',
					memberIds: [user2.userId]
				}
				Lotus.ChatService.Conversation.createGroup(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#createGroup', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					conversationId = result.conversation.conversationId;
					done();
				});
			});
		});

		describe('#addMembers', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					memberIds: [
						user3.userId,
						user4.userId
					]
				}
				Lotus.ChatService.Conversation.addMembers(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#addMembers', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});


		describe('#getMembers', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId
				}
				Lotus.ChatService.Conversation.getMembers(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#getMembers', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#getNextPage', function() {
			it(user1.name, function(done) {
				var param = {
					options: {
						pageSize: 2,
						messageId: null
					}
				}
				Lotus.ChatService.Conversation.getNextPage(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#getNextPage', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#getPreviousPage', function() {
			it(user1.name, function(done) {
				var param = {
					options: {
						pageSize: 2,
						messageId: null
					}
				}
				Lotus.ChatService.Conversation.getPreviousPage(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#getPreviousPage', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#removeMembers', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					memberIds: [
						user4.userId
					]
				}
				Lotus.ChatService.Conversation.removeMembers(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#removeMembers', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe.skip('#delete', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId
				}
				Lotus.ChatService.Conversation.delete(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#delete', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});
	});

	describe('Message', function() {

		describe('#chat', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					preview: 'Test message ...',
					body: {
						content: 'Hello',
						file: {
							name: 'Audio file',
							type: 'audio/aiff'
						}
					}
				};

				var fileBuffer = new Uint8Array(1 * 1024 * 1024);
				fileBuffer = null;

				Lotus.ChatService.Message.chat(
					param,
					fileBuffer,
					function(error, result, payload, roundTripTime, serverLatency) {
						print('#chat', error, result, payload, roundTripTime, serverLatency)
						messageId = result.message.messageId;
						if (result.file) blobId = result.file.blobId;
						assert.equal(null, error);
						done();
					},
					function(error, result) {
						console.log(error, result);
					}
				);
			});
		});

		describe.skip('#photo', function() {
			it(user1.name, function(done) {
				conversationId = '4d7f38c0-48e6-11e6-aec6-be1948bc203b'
				var param = {
					conversationId: conversationId,
					preview: 'Test message ...',
					body: {
						title: 'Test photo',
						thumbnail: 'base64',
						photo: {
							name: 'Test photo',
							type: 'image/png'
						}
					}
				};

				var photoBuffer = new Uint8Array(1 * 1024 * 1024);

				Lotus.ChatService.Message.photo(
					param,
					photoBuffer,
					function(error, result, payload, roundTripTime, serverLatency) {
						print('#photo', error, result, payload, roundTripTime, serverLatency)
						messageId = result.message.messageId;
						if (result.photo) blobId = result.photo.blobId;
						assert.equal(null, error);
						done();
					},
					function(error, result) {
						console.log(error, result);
					}
				);
			});
		});

		describe('#missedCall', function() {
			it.skip(user1.name, function(done) {
				conversationId = '4d7f38c0-48e6-11e6-aec6-be1948bc203b'
				var param = {
					conversationId: conversationId,
					preview: 'Missed audio call',
					body: {
						content: 'Missed audio call',
					}
				};

				Lotus.ChatService.Message.missedCall(
					param,
					function(error, result, payload, roundTripTime, serverLatency) {
						print('#missedCall', error, result, payload, roundTripTime, serverLatency)
						messageId = result.message.messageId;
						assert.equal(null, error);
						done();
					}
				);
			});
		});

		describe('#audioCall', function() {
			it.skip(user1.name, function(done) {
				conversationId = '4d7f38c0-48e6-11e6-aec6-be1948bc203b'
				var param = {
					conversationId: conversationId,
					preview: 'Audio call: ABC123',
					body: {
						content: 'Please join audio call',
						roomId: 'ABC123'
					}
				};

				Lotus.ChatService.Message.audioCall(
					param,
					function(error, result, payload, roundTripTime, serverLatency) {
						print('#audioCall', error, result, payload, roundTripTime, serverLatency)
						messageId = result.message.messageId;
						assert.equal(null, error);
						done();
					}
				);
			});
		});


		describe('#videoCall', function() {
			it.skip(user1.name, function(done) {
				conversationId = '4d7f38c0-48e6-11e6-aec6-be1948bc203b'
				var param = {
					conversationId: conversationId,
					preview: 'Video call: ABC123',
					body: {
						content: 'Please join video call',
						roomId: 'ABC123'
					}
				};

				Lotus.ChatService.Message.videoCall(
					param,
					function(error, result, payload, roundTripTime, serverLatency) {
						print('#videoCall', error, result, payload, roundTripTime, serverLatency)
						messageId = result.message.messageId;
						assert.equal(null, error);
						done();
					}
				);
			});
		});

		describe('#readBlob', function() {
			it('blobId', function(done) {
				if (blobId) {
					var param = {
						blobId: blobId
					};

					Lotus.BlobService.Blob.readBlob(
						param,
						function(error, result, payload, roundTripTime, serverLatency) {
							print('#readBlob', error, result, payload, roundTripTime, serverLatency)
							assert.equal(null, error);
							done();
						},
						function(error, result) {
							console.log(error, result);
						}
					);

				} else {
					done();
				}
			});
		});

		describe('#setReadMessage', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					messageId: messageId
				}
				Lotus.ChatService.Message.setReadMessage(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#setReadMessage', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					done();
				});
			});
		});

		describe('#getNextPage', function() {
			it(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					options: {
						pageSize: 2,
						// messageId: messageId
					}
				}
				Lotus.ChatService.Message.getNextPage(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#getNextPage', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);

					param.options = result.options;
					Lotus.ChatService.Message.getNextPage(param, function(error, result, payload, roundTripTime, serverLatency) {
						print('#getNextPage', error, result, payload, roundTripTime, serverLatency)
						assert.equal(null, error);
						done();
					});
				});
			});
		});

		describe('#getPreviousPage', function() {
			it.skip(user1.name, function(done) {
				var param = {
					conversationId: conversationId,
					options: {
						pageSize: 2,
						// messageId: messageId
					}
				}
				Lotus.ChatService.Message.getPreviousPage(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#getPreviousPage', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);

					param.options = result.options;
					Lotus.ChatService.Message.getPreviousPage(param, function(error, result, payload, roundTripTime, serverLatency) {
						print('#getPreviousPage', error, result, payload, roundTripTime, serverLatency)
						assert.equal(null, error);
						done();
					});
				});
			});
		});
	});

	describe('Session', function() {

		describe('#signOut', function() {
			it.skip('signOut ' + user1.name, function(done) {
				Lotus.AccountService.Session.signOut(function(error, result, payload, roundTripTime, serverLatency) {
					assert.equal(null, error);
				});
				done();
			});
		});

	});

});