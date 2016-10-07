/**
 * Created by trungtrungkang on 1/21/16.
 */

import config from './config';

var utils = {
  chat_type_group: 'group',
  chat_type_one2one: 'one',
  chat_type_secret: 'secret',
  req_data_splitor: '---data---',
  default_password: 'gossip',
  get_gossip_user: function (contacts) {
    var re = [];
    if (contacts) {
      for (var i = 0; i < contacts.length; i++) {
        if (contacts[i].is_gossip == true) {
          re.push(contacts[i]);
        }
      }
    }
    return re;
  },
  build_conv_key: function (sender_id, receiver_id, message_type) {
    return sender_id + ':to:' + message_type + ':' + receiver_id;
  },
  get_chat_type_from_conv_id: function (conv_id) {
    if (!conv_id || conv_id == 'undefined') return null;
    return conv_id.split(":")[2];
  },
  get_partner_from_conv_id: function (conv_id) {
    if (!conv_id || conv_id == 'undefined') return null;
    var owner_id = localStorage.getItem(config.cred_key.my_user_id);
    var parts = conv_id.split(':');
    return (parts[0] == owner_id) ? parts[3] : parts[0];
  },
  get_owner_from_conv_id: function(conv_id){
    var owner_id = localStorage.getItem(config.cred_key.my_user_id);
    var parts = conv_id.split(':');
    return (parts[0] == owner_id) ? parts[0] : parts[3];
  },
  number_filter: function (input) {
    input = input.replace(" ", "");
    input = input.replace(/\(/g, "");
    input = input.replace(/\)/g, "");
    input = input.replace(/\-/g, "");
    input = input.replace(/\s/g, '');
    return input;
  },
  is_conv_id_valid: function (conv_id) {
    if (!conv_id || conv_id == 'undefined') return false;
    var partner_id = this.get_partner_from_conv_id(conv_id);
    var user_id = conv_id.split(":")[0];
    if (this.is_uuid(user_id) && this.is_uuid(partner_id)) {
      return true;
    } else {
      return false;
    }
  },
  swap_partner_id: function (conv_id) {
    var ele = conv_id.split(":");
    var tmp = ele[3];
    ele[3] = ele[0];
    ele[0] = tmp;
    return ele.join(':');
  },
  is_uuid: function (uuid) {
    var validRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuid && uuid != 'undefined') {
      if (uuid.match(validRegEx) != null) {
        return true;
      }
    }
    return false;
  },

  message_notification: function () {
    if (navigator.notification) {
      navigator.notification.vibrate(2500);
    }
  },

  get_ios_contact_name: function (c) {
    var name = c.displayName;
    if (!name || name === "") {
      if (c.name && c.name.formatted) return c.name.formatted;
      if (c.name && c.name.givenName && c.name.familyName) return c.name.givenName + " " + c.name.familyName;
      return null;
    }
    return name;
  },
  get_app_path: function () {
    var path = window.location.pathname;
    path = path.substr(0, path.length - 10);
    return 'file://' + path;
  },
  resize_image: function (url, width, height, callback) {
    console.log("In_resizeImage");
    var sourceImage = new Image();

    sourceImage.onload = function (evt) {
      console.log("In_sourceImage_onload");
      console.log("sourceImage.width:" + sourceImage.width);
      console.log("sourceImage.height:" + sourceImage.height);
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      if (sourceImage.width == sourceImage.height) {
        canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
      } else {
        var minVal = Math.min(sourceImage.width, sourceImage.height);
        if (sourceImage.width > sourceImage.height) {
          canvas.getContext("2d").drawImage(sourceImage, (sourceImage.width - minVal) / 2, 0, minVal, minVal, 0, 0, width, height);
        } else {
          canvas.getContext("2d").drawImage(sourceImage, 0, (sourceImage.height - minVal) / 2, minVal, minVal, 0, 0, width, height);
        }
      }

      callback(canvas.toDataURL());
    };

    sourceImage.src = url;
  },
  get_file_arraybuffer: function (file, cb) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
      cb(new Uint8Array(evt.target.result));
    };
    reader.readAsArrayBuffer(file);
  },
  get_file_meta: function (file_url, cb) {
    window.resolveLocalFileSystemURL(file_url, function (fileEntry) {
      fileEntry.file(function (file_meta) {
        cb(null, file_meta);
      });
    }, function (err) {
      cb(err);
    });
  },

  unescape_unicode: function (str) {
    var r = /\\u([\d\w]{4})/gi;
    str = str.replace(r, function (match, grp) {
      return String.fromCharCode(parseInt(grp, 16));
    });
    return window.unescape(str);
  },

  remove_backslash: function (str) {
    return str.replace(/\\/g, "");
  },

  get_file_base64: function (path, cb) {
    this.get_file_meta(path, function (err, file_meta) {
      if (file_meta) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
          var base64 = evt.target.result; // this is your Base64 string
          cb(base64);
        };
        reader.readAsDataURL(file_meta);
      } else {
        cb(null);
      }
    });
  },

  set_app_icon_badge_number: function (number) {
    if (typeof cordova != 'undefined') {
      var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
      if (device.platform == "Android") {
      }

      if (device.platform == "iPhone" || device.platform == "iOS") {
        pushNotification.setApplicationIconBadgeNumber(number);
      }

      if (device.platform == "Win32NT") {
      }
    }
  },

  get_interal_url: function (path, cb) {
    window.resolveLocalFileSystemURL(path, function (fileEntry) {
      var re = fileEntry.toInternalURL();
      cb(null, re);
    }, function (err) {
      cb(err);
    });
  },


  play_receiving_call_sound: function (media_src) {
    console.log('Playing sound...');
    try {
      var media = new Media(media_src, function () {
        console.log('Play sound OK');
      }, function () {
        console.log('Play sound failed');
      });
      media.play();
      return media;
    } catch (err) {
      console.log('Not support PLAYING MEDIA');
    }
  },


  keep_phone_awake: function (is_on) {
    var plugins = window.plugins;
    try {
      if (is_on) {
        plugins.insomnia.keepAwake();
      } else {
        plugins.insomnia.allowSleepAgain();
      }
    } catch (e) {
      console.log(e);
    }
  },


  close_keyboard: function () {
    try {
      if (this.isPhoneGap()) {
        cordova.plugins.Keyboard.close();
      }
    } catch (e) {
      console.log('Close keyboard err: ', e);
    }
  },


  get_now_iso: function () {
    var date = new Date();
    return new Date(date.getTime()).toJSON();
  },

  get_sending_time: function () {
    var re = null;
    var cur = new Date().valueOf();
    var time_offset = window.time_offset;

    try {
      var time_offset = (time_offset) ? time_offset : 0;
      re = new Date(cur + time_offset).toJSON();
    } catch (err) {
      console.log('time offset: ', time_offset, err);
      re = new Date(cur).toJSON();
    }
    return re;
  },

  get_receive_time: function () {
    var re = null;
    var cur = new Date().valueOf();
    var time_offset = window.time_offset;

    try {
      var offsetted_time = cur;
      if (time_offset) {
        offsetted_time = cur + time_offset;
      }
      re = new Date(offsetted_time).toJSON();
    } catch (err) {
      re = new Date(cur).toJSON();
    }
    return re;
  },
  isPhoneGap: function () {
    return (cordova || PhoneGap || phonegap)
      && /^file:\/{3}[^\/]/i.test(window.location.href)
      && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
  },
  validate_email: function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
  }
};

window.open_link = function (url) {
  cordova.ThemeableBrowser.open(url, '_blank', {
    statusbar: {
      color: '#33aaffff'
    },
    toolbar: {
      height: 44,
      color: '#33aaffff'
    },
    title: {
      color: '#ffffffff',
      showPageTitle: true
    },
    backButton: {
      wwwImage: 'media/img/arrows-back-icon.png',
      wwwImagePressed: 'media/img/arrows-back-icon.png',
      wwwImageDensity: 2,
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      wwwImage: 'media/img/arrows-forward-icon.png',
      wwwImagePressed: 'media/img/arrows-forward-icon.png',
      wwwImageDensity: 2,
      align: 'left',
      event: 'forwardPressed'
    },
    closeButton: {
      wwwImage: 'media/img/icon-close-128.png',
      wwwImagePressed: 'media/img/lightbox_close.gif',
      wwwImageDensity: 2,
      align: 'right',
      event: 'closePressed'
    },
    backButtonCanClose: true
  });
};

export default utils;