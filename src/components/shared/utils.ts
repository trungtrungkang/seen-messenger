import model from '../../model/all';

var domain = (function(){
    var w = window || self;

    switch(w.location.hostname){
        case 'seen.life':
        case 'qa.seen.life':
            return w.location.hostname;
        default:
            return 'office2.seen.life';
    }
})();

function getUser(userId){
    var state = model.store.getState();
    var owner = state.userData.user;
    if(owner.userId == userId){
        return owner;
    }

    return state.contactData.contacts.find((c) => c.userId == userId);
}

export function resolveUrl(path: string){
    return isAbsoluteUrl(path) ? path: `https://${domain}/${path}`;
}

export function isAbsoluteUrl(path: string){
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(path);
}

export function getAvatarUrl(userId){
    var usr = getUser(userId);
    if(!usr) return '/assets/images/unseen-avatar.png';
    return resolveUrl(usr.avatarUrl);
}

export function getProfileUrl(userId){
    var usr = getUser(userId);
    if(!usr) return '(null)';
    return resolveUrl(usr.profileUrl);
}

export function getDisplayName(userId){
    var usr = getUser(userId);
    if(!usr) return '(null)';
    return usr.name || usr.email;
}

export var defaultGroupAvatar = '/assets/images/group-users.png';