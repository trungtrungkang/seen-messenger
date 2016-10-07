(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Client = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * @copyright sanjiv.bhalla@gmail.com
 *
 * Released under the MIT license
 */

'option strict';

var Command = {
	Session: {
		RESTORE_SESSION: '2oaP9p',
		On: {
			BEGIN_USER_SESSION: 'PLA8R',
			UPDATE_SESSION_TOKEN: 'flqo7'
		}
	}
};

module.exports = Client;

function Client(config, ClientIO, ClientAPI) {
	this.pipe = new ClientIO(config);
	this.config = this.pipe.config;

	this.Enum = this.pipe.Enum;

	this.API = new ClientAPI(this.pipe);
	this.sessionId = this.pipe.md5(new Date().getTime() + ':' + Math.random());
}

Client.prototype.start = function(callback) {
	var self = this;
	this.callback = callback;

	this.pipe.start(function(status, response) {
		switch (status) {
			case self.Enum.Status.CONNECTION_OPENED:
				self.pipe.log.trace(status, response.pipeId);

				self.addSessionTokenListener();
				if (self.callback) self.callback(status, response);

				self.restoreSession();
				break;

			case self.Enum.Status.CONNECTION_CLOSED:
				self.pipe.log.trace(status, response.pipeId);
				if (self.callback) self.callback(status, response);
				break;

			case self.Enum.Status.MAX_CONNECT_ATTEMPTS:
				self.pipe.log.trace(status, response);
				if (self.callback) self.callback(status, response);
				break;
		}
	});

	return this;
}

Client.prototype.restoreSession = function() {
	if (this.config.MetaData.sessionToken) {
		var self = this,
			param = {
				token: this.config.MetaData.sessionToken
			};

		this.pipe.sendRequest(Command.Session.RESTORE_SESSION, param, null, function(error, result, payload, roundTripTime, networkLatency) {
			if (!error) {
				if (self.callback) self.callback(self.Enum.Status.SESSION_RESTORED);

			} else {
				if (self.callback) self.callback(self.Enum.Status.SESSION_FAILED, error.message);
			}
		});

	} else {
		this.callback(this.Enum.Status.SESSION_FAILED, 'No session token');
	}
}

Client.prototype.addSessionTokenListener = function() {
	var self = this;

	this.pipe.on(Command.Session.On.BEGIN_USER_SESSION, function(error, result, payload, roundTripTime, networkLatency) {
		if (!error) {
			self.config.MetaData.sessionToken = result.token;
			if (self.callback) self.callback(self.Enum.Status.SESSION_RESTORED, result);
		}
	});

	this.pipe.on(Command.Session.On.UPDATE_SESSION_TOKEN, function(error, result, payload, roundTripTime, networkLatency) {
		if (!error) {
			self.config.MetaData.sessionToken = result.token;
			self.config.MetaData.sessionExpiresInSeconds = result.expiresInSeconds;
			self.startSessionTimer();

			if (self.callback) self.callback(self.Enum.Status.SESSION_UPDATED, result);
		}
	});
}


Client.prototype.startSessionTimer = function() {
	if (!this.sessionTimer) {
		this.sessionTimer = setInterval(function() {
			//
		}, this.config.MetaData.sessionExpiresInSeconds * 1000);
	}
}
},{}]},{},[1])(1)
});