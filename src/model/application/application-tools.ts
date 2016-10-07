import store from '../store';

var appCode = Date.now();
export {appCode};

export function isActive(){
    return store.getState().applicationData.state == 'active';
}