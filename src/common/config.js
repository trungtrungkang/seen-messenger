/**
 * Created by trungtrungkang on 1/21/16.
 */
var config = (function() {
    var protocol = 'http';
    var port = '80';
    var secure = false;
    var w = (typeof(window) != 'undefined') ? window: self;

    var host;
    var seenlife_domain;

    switch(w.location.hostname){
        case 'seen.life':
            host = 'chat.seen.life';
            seenlife_domain = 'seen.life';
            break;
        case 'qa.seen.life':
            host = 'qachat.seen.life';
            seenlife_domain = 'qa.seen.life';
            break;
        default:
            host = 'devchat.seen.life';
            seenlife_domain = 'office2.seen.life';
            break;
    }
    
    if(w.location.protocol.indexOf('https') != -1){
        protocol = 'HTTPS';
        port = '443';
        secure = true;
    }
    
    return {
        seenlife_domain: seenlife_domain,

        pw: {
            appid: 'DA85D-3C1C0', // dev
            // appid: 'E7D85-E731C', // pro
        },

        app_server: 'lotus', // [freesia, lotus]

        andaman_server: {
            // lotus config
            server_publicKey: '5Jz3NhPHKUYP2JfU2n+xsT8Q5xC57yhhWa2Mdprva0A=',
            serverProtocol: protocol,
            host: host,
            // host: '65.49.34.229', // testflight
            //host: '64.71.165.211', // dev
            // host: 'localhost',
            //host: '64.71.165.210', // Coke
            port: port,
            secure: secure
            // port: '3002'

            // freesia config
            // server_publicKey: 'EawuEcEVjz7gbBHEiqBsee9qU+3g+jakQaYAzbd9wXg=',
            // protocol: 'ws',
            // // host: '65.49.34.226',
            // host: '65.49.34.227',
            // port: '8080',
            // ww: false
        },

        localDB_version: '10:31-20Apr2016',
        conversation_sync_offset_time: 'offset_last_action_time',
        cred_key: {
            my_avatar: 'my_avatar',
            my_device_id: 'my_device_id',
            my_device_token: 'my_device_token',
            my_display_name: 'my_display_name',
            my_email: 'my_email',
            my_password: 'my_password',
            my_phone_number: 'my_phone_number',
            my_status_message: 'my_status_message',
            my_cas_token: 'my_cas_token',
            my_user_id: 'my_user_id',
            my_username: 'my_username'
        },
        flag: {
            did_copy_phone_contacts: 'did_copy_phone_contacts'
        },
        contact_id_prefix: 'phone_contact_id_',
        user_id_prefix: 'user_id_',
        group_id_prefix: 'group_id_',
        roster_synced: 'roster_synced'
    };
})();

export default config;