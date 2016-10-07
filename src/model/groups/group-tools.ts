import LotusService from '../lotus-service';
import store from '../store';

export function loadGroups() {
    return new Promise((resolve, reject) => {
        var lotus = LotusService.singleton();
        lotus.ready().then((Andaman) => {
            var user_id = store.getState().userData.user.userId;
            var data = { user_id };

            Andaman.groups.get_groups_by_user(data, function (resp) {
                if(resp.err) {
                    reject(resp.err);
                }
                else {
                    resolve(resp.re);
                }
            });
        });
    });
}

