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

function getUser(userNo, withUserId) {
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

	if (withUserId) {
		user.userId = (userNo + '00000000').substr(0, 8) + '-1000-1000-1000-100000000000';
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

describe('Lotus APIs', function() {
	this.timeout(200000);
	this.slow(20);

	before(function(done) {
		var config = {
			mode: App.Enum.Mode.DEV,
			// serverProtocol: App.Enum.ServerProtocol.HTTPS,
			device: App.Enum.Device.ENGINE_IO,
			host: window.location.hostname,
			// port: 3000,
			requestTimeoutSecs: 60
		};

		// config.host = '64.71.165.211';

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

			// console.log(status, response);
		});
	});

	var userNo1 = 1,
		userNo2 = 2,
		userNo3 = 3,
		userNo4 = 4,
		userNo5 = 5,
		userNo6 = 6,
		idToken = null;

	var user1 = getUser(userNo1),
		user2 = getUser(userNo2),
		user3 = getUser(userNo3),
		user4 = getUser(userNo4);

	describe('Account and Session', function() {

		describe('#signUp', function() {
			var user = user1;
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
					device: user.device
				}

				Lotus.AccountService.Session.signIn(param, function(error, result, payload, roundTripTime, serverLatency) {
					print('#signIn', error, result, payload, roundTripTime, serverLatency)
					assert.equal(null, error);
					if (!error) {
						idToken = result.idToken;
					}
					done();
				});
			});
		});
	});

	describe.skip('State', function() {
		describe.skip('#onStateChanged', function() {
			it(user1.name, function(done) {
				Lotus.AccountService.Roster.onStateChanged(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onStateChanged', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe.skip('#onStateChanged', function() {
			it(user1.name, function(done) {
				Lotus.AccountService.Roster.onStateChanged(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onStateChanged', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

	});

	describe.skip('Roster', function() {

		describe('#onPartnerAdded', function() {
			it('Partner ' + user1.name, function(done) {
				Lotus.AccountService.Roster.onPartnerAdded(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onPartnerAdded', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe('#onPartnerRemoved', function() {
			it('Partner ' + user1.name, function(done) {
				Lotus.AccountService.Roster.onPartnerRemoved(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onPartnerRemoved', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe('#onPartnerRemoved', function() {
			it('Partner ' + user1.name, function(done) {
				Lotus.AccountService.Roster.onPartnerRemoved(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onPartnerRemoved', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

	});

	describe.skip('Conversation', function() {

		describe('#onCreated', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Conversation.onCreated(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onCreated', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe.skip('#onMembersAdded', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Conversation.onMembersAdded(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onMembersAdded', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe.skip('#onMembersRemoved', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Conversation.onMembersRemoved(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onMembersRemoved', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe('#onDeleted', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Conversation.onDeleted(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onDeleted', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

	});

	describe('Message', function() {

		describe('#onMessage', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Message.onMessage(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onMessage', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

		describe('#onMessageStats', function() {
			it(user1.name, function(done) {
				Lotus.MessageService.Message.onMessageStats(function(error, result, payload, roundTripTime, serverLatency) {
					print('#onMessageStats', error, result, payload, roundTripTime, serverLatency)
					done();
				});
			});
		});

	});

	describe.skip('Session', function() {

		describe('#signOut', function() {
			it('signOut ' + user2.name, function(done) {
				Lotus.AccountService.Session.signOut(function(error, result, payload, roundTripTime, serverLatency) {
					assert.equal(null, error);
				});
				done();
			});
		});

	});
});