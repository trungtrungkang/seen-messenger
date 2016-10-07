var path = require('path');

//load and initialize some global objects
require('core-js/shim');

ClientIO = require('../assets/lib/lotus/v2/client-io.js');
ClientAPI = require('../assets/lib/lotus/v2/client-api.js');
Client = require('../assets/lib/lotus/v2/client.js');

require('assets/lib/uikit/less/uikit.less!');
require('assets/lib/uikit/less/components/autocomplete.less!');
require('assets/lib/uikit/less/components/slidenav.less!');
require('assets/lib/uikit/less/components/form-file.less!');
require('assets/lib/uikit/less/components/dotnav.less!');

require('assets/lib/uikit/js/uikit.min.js');
require('assets/lib/uikit/js/components/autocomplete.min.js');
require('assets/lib/uikit/js/components/slideset.min.js');
require('assets/lib/uikit/js/components/lightbox.min.js');

require('assets/lib/emojify/emojify.js');
require('assets/lib/emojify/emojify.min.css!');

require('assets/lib/linkify/linkify.min.js');
require('assets/lib/linkify/linkify-element.min.js');

var loadjs = require('../assets/lib/loadjs/loadjs.min.js');
loadjs(['/assets/lib/quill/quill.min.js',
        '/assets/lib/quill/quill.snow.css'], function(){
        });

require('../assets/css/seenchat.css!');

Push = require('push.js');
FileSaver = require('file-saver');
plyr = require('plyr/dist/plyr.js');
require('plyr/dist/plyr.css!');


emojify.setConfig({
  emojify_tag_type: 'div', // Only run emojify.js on this element
  only_crawl_id: null, // Use to restrict where emojify.js applies
  img_dir: '/assets/images/emoji', // Directory for emoji images
  ignored_tags: { // Ignore the following tags
    'SCRIPT': 1,
    'TEXTAREA': 1,
    'A': 1,
    'PRE': 1,
    'CODE': 1
  }
});
