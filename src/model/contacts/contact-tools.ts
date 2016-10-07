import store from '../store';
import { IContact } from '../types';
import LotusService from '../lotus-service';

function addPartner(email) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = { partnerEmail: email };
            Lotus.AccountService.Roster.addPartner(data, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

function getContacts(){
    return new Promise<any>((resolve) => {
        var contacts = [];
        var errs = [];

        Promise.all([getOnlinePartners(), getOfflinePartners()]).then((results) => {
            for(var i = 0; i < results.length; i++){
                var resp = results[i];
                if(resp.err){
                    errs.push(resp.err);
                }
                else{
                    contacts = contacts.concat(...resp.re.partners);
                }
            }

            resolve({err: errs[0], re: {partners: contacts}});
        });
    });
}

function getOnlinePartners(options?){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            if(!options){
                options = {pageSize: 50, partnerId: null};
            }

            Lotus.AccountService.Roster.getOnlineNextPage({options}, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

function getOfflinePartners(options?){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            if(!options){
                options = {pageSize: 50, partnerId: null};
            }
            
            Lotus.AccountService.Roster.getOfflineNextPage({options}, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

export { addPartner, getContacts, getOnlinePartners, getOfflinePartners };