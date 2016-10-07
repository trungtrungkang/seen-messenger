/**
 * Created by kang on 2/21/16.
 */
function oldBrowser () {
    throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}

function randomBytes (size, cb) {
    // phantomjs needs to throw
    if (size > 65536) throw new Error('requested too many random bytes')
    // in case browserify  isn't using the Uint8Array version
    var rawBytes = new Uint8Array(size);

    // This will not work in older browsers.
    // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
    crypto.getRandomValues(rawBytes);

    // phantomjs doesn't like a buffer being passed here
    var bytes = rawBytes;//new Buffer(rawBytes.buffer);

    if (cb) {
        return process.nextTick(function () {
            cb(null, bytes)
        });
    }

    return bytes
}

var crypto = window.crypto || window.msCrypto;

export default ((crypto && crypto.getRandomValues) ? randomBytes : oldBrowser);