/*
 * @copyright sanjiv.bhalla@gmail.com
 *
 * Released under the MIT license
 */

'option strict';

var App = {
	Enum: ClientIO.Enum,

	init: function(config) {
		App.client = new Client(config, ClientIO, ClientAPI);
	},

	info: function() {
		if (App.client.config.mode === 'DEV') {
			console.log('/********************************************************************/');
			console.log('API: ', App.client.API.version);
			console.log('Config:', App.client.config);
			console.log('Enum:', App.Enum);
			console.log('/********************************************************************/');
		}
	}
};