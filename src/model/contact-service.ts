import { IContact } from './types';
import LotusService from './lotus-service';
import store from './store';

type PageSettings = {
    email: string,
    page_size: number,
    offset?: number
};

type RosterResponse = {
    rows: any[],
    options: PageSettings
};

export default class ContactService {
    private onlineUsers: IContact[] = [];
    private users: IContact[] = [];

    private static _instance: ContactService;
    static singleton(): ContactService {
        if (!ContactService._instance) {
            ContactService._instance = new ContactService();
        }

        return ContactService._instance;
    }

    getOnlineContacts() {
        this.onlineUsers = [];

        return new Promise<IContact[]>((resolve, reject) => {
            var user = store.getState().userData.user;
            this.getOnlineRoster().then((resp) => {
                this.onlineUsers = resp.rows.sort(sortContacts);
                this.users = getUniqueContacts(this.onlineUsers.concat(this.users));

                resolve(this.users.sort(sortContacts));
            }).catch((err) => {
                reject(err);
            });
        });
    }

    updateOnlineContacts() {
        this.onlineUsers = [];

        return new Promise((resolve, reject) => {
            this.getAllOnlineRoster().then((resp) => {
                this.onlineUsers = getUniqueContacts(this.onlineUsers.concat(resp.rows));
                // Update online status
                this.users = getUniqueContacts(this.onlineUsers.concat(this.users));
                resolve(this.users.sort(sortContacts));
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getOnlineRoster(options?: PageSettings) {
        return new Promise<RosterResponse>((resolve, reject) => {
            LotusService.singleton().ready().then((Andaman) => {
                var user = store.getState().userData.user;
                options = options || { email: user.email, page_size: 100, offset: null };

                Andaman.rosters.get_online_roster(options, (resp) => {
                    if (resp.err) reject(resp.err);
                    else {
                        var rows = <any[]>resp.re.rows || [];
                        rows = rows.filter((c) => {
                            if (c) {
                                c.is_online = true;
                                return true;
                            }

                            return false;
                        });

                        options.offset = resp.re.offset;
                        resolve({ rows, options });
                    }
                });
            });
        });
    }

    getAllOnlineRoster() {
        return new Promise<RosterResponse>((resolve, reject) => {
            let user = store.getState().userData.user;
            let options = { email: user.email, page_size: 100, offset: null };

            this.doGetAllOnlineRoster(options, (resp) => {
                if(resp.err) {
                    reject(resp.err);
                }
                else {
                    resolve({rows: resp.rows, options: resp.options});
                }
            });
        });
    }

    doGetAllOnlineRoster(options: PageSettings, cb, rosterList?: any[]) {
        rosterList = rosterList || [];
        this.getOnlineRoster(options).then((resp) => {
            rosterList = rosterList.concat(resp.rows);
            if(resp.options.offset){
                setTimeout(() => {
                    this.doGetAllOnlineRoster(resp.options, cb, rosterList);
                }, 0);
            }
            else{
                cb({rows: rosterList, options: options});
            }
        }).catch((err) => {
            cb({err});
        });
    }

    getContacts() {
        this.users = [];

        return new Promise((resolve, reject) => {
            LotusService.singleton().ready().then((Andaman) => {
                var user = store.getState().userData.user;
                var page_size = 100;
                var offset = null;

                var get_roster_cb = (resp) => {
                    if (resp.err) reject(resp.err);
                    else {
                        offset = resp.re.offset;

                        // Fix wrong value returning from server
                        var rows = <any[]>resp.re.rows || [];
                        rows = rows.filter((c) => {
                            if(c){
                                c.user_id = c.partner_id;
                                delete c.partner_id;

                                return true;
                            }

                            return false;
                        });

                        this.users = this.users.concat(rows);

                        // Update online status
                        this.users = getUniqueContacts(this.onlineUsers.concat(this.users));
                    }
                    if (offset) {
                        Andaman.rosters.get_roster({ email: user.email, page_size: page_size, offset: offset }, get_roster_cb);
                    } else {
                        resolve(this.users.sort(sortContacts));
                        localStorage.setItem("contacts", JSON.stringify(this.users));
                    }
                };
                Andaman.rosters.get_roster({ email: user.email, page_size: page_size, offset: offset }, get_roster_cb);
            });
        });
    }

    getUserById(id) {
        return new Promise((resolve, reject) => {
            var found = this.users.filter((u) => u.userId == id)[0];
            if (found) resolve(found);

            LotusService.singleton().ready().then((Andaman) => {
                Andaman.get_user_by_id({ user_id: id }, (resp) => {
                    if (resp.err) reject(resp.err);
                    else resolve(resp.re);
                });
            });
        });
    }
}

function sortContacts(a: IContact, b: IContact) {
    var cmp_status;
    if (a.state === b.state) cmp_status = 0;
    else if (a.state) cmp_status = -1;
    else cmp_status = 1;

    var name1 = (a.name || '').toLowerCase(),
        name2 = (b.name || '').toLowerCase();

    return cmp_status || name1.localeCompare(name2);
}

function getUniqueContacts(contacts: IContact[]) {
    var emails = [];
    return contacts.filter((c) => {
        if(c && emails.indexOf(c.email) == -1){
            emails.push(c.email);
            return true;
        }

        return false;
    });
}