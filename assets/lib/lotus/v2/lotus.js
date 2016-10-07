/*
 * @copyright unseen, ehf
 */

'option strict';

var App = {

	Enum: ClientIO.Enum,

	init: function(config) {
		App.client = new Client(config, ClientIO, ClientAPI);

		var lotus = App.client.API;
		lotus.Enum = ClientIO.Enum;
		lotus.config = App.client.config;
		lotus.AccountService.Session.sessionId = App.client.sessionId;

		lotus.start = function(callback) {
			App.client.start(callback);
		};

		lotus.ready = function() {
			return lotus.pipe.ready();
		};

		lotus.info = function() {
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