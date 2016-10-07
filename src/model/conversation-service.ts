import LotusService from './lotus-service';
import store from './store';

export default class ConversationService{
    loadMore(data) {
        return new Promise((resolve, reject) => {
            LotusService.singleton().ready().then((Andaman) => {
                var user = store.getState().userData.user;
                data = data || {user_id: user.userId, options: {page_size: 100}};

                Andaman.conversations.conv_get_previous_block_by_user(data, (resp) => {
                    if (resp.err) reject(resp.err);
                    else{
                        var items = (resp && resp.re) ? resp.re.rows : [];
                        var settings = (resp && resp.re) ? resp.re.data : null;
                        resolve({conversations: items, settings: settings});
                    }
                });
            });
        });
    }

    static _instance: ConversationService;
    static singleton(): ConversationService{
        if(!ConversationService._instance){
            ConversationService._instance = new ConversationService();
        }

        return ConversationService._instance;
    }
}