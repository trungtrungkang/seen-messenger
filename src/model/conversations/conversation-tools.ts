import { IConversation, IContact, MEMBER_TYPE } from '../types';
import store from '../store';
import LotusService from '../lotus-service';

export function sort(conversations: IConversation[]) {
    return conversations.sort((c1, c2) => {
        var d1 = new Date(c1.active_time);
        var d2 = new Date(c2.active_time);

        if (d1 == d2) return 0;
        return (d1 < d2) ? 1 : -1;
    });
}

function __createOne(contact: IContact) {
    return new Promise<IConversation>((resolve, reject) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = {
                title: `${contact.name || contact.email}`,
                memberId: contact.userId
            };

            Lotus.ChatService.Conversation.createOne(data, (error, result) => {
                if (error) reject(error);
                else {
                    var owner = store.getState().userData.user;
                    var data = result.conversation;
                    var lastMsgTime = new Date(data.lastMessageTime);
                    var conv: IConversation = {
                        id: data.conversationId,
                        type: data.conversationType,
                        last_message: {
                            id: data.lastMessageId,
                            sender_id: data.lastSenderId,
                            content: data.lastMessageContent,
                            created_time: lastMsgTime
                        },
                        title: data.title,
                        members: [{userId: owner.userId, name: owner.name}, {userId: contact.userId, name: contact.name}],
                        active_time: lastMsgTime,
                        unread_message_count: 0
                    };

                    resolve(conv);
                }
            });
        });
    });
}

function createOne(contact: IContact) {
    return __createOne(contact);
    //return createGroup(`${contact.name || contact.email}`, contact.userId);
}

function createGroup(title: string, ...memberIds: string[]) {
    return new Promise<IConversation>((resolve, reject) => {
        var contacts = store.getState().contactData.contacts;
        LotusService.singleton().ready().then((Lotus) => {
            var data = {
                title: title,
                memberIds: memberIds
            };

            Lotus.ChatService.Conversation.createGroup(data, (error, result) => {
                if (error) reject(error);
                else {
                    var contacts = store.getState().contactData.contacts;
                    var members = memberIds.map((id) => {
                        var c = contacts.find((c) => c.userId == id);
                        return {userId: c.userId, name: c.name};
                    });

                    var data = result.conversation;
                    var lastMsgTime = new Date(data.lastMessageTime);
                    var conv: IConversation = {
                        id: data.conversationId,
                        type: data.conversationType,
                        last_message: {
                            id: data.lastMessageId,
                            sender_id: data.lastSenderId,
                            content: data.lastMessageContent,
                            created_time: lastMsgTime
                        },
                        title: data.title,
                        members: members,
                        memberType: MEMBER_TYPE.OWNER,
                        active_time: lastMsgTime,
                        unread_message_count: 0
                    };

                    resolve(conv);
                }
            });
        });
    });
}

function convert(data) {
    return new Promise<IConversation>((resolve) => {
        var lastMsgTime = new Date(data.lastMessageTime);
        var conv: IConversation = {
            id: data.conversationId,
            type: data.conversationType,
            last_message: {
                id: data.lastMessageId,
                sender_id: data.lastSenderId,
                content: data.lastMessageContent,
                created_time: lastMsgTime
            },
            members: [],
            title: data.title,
            active_time: lastMsgTime,
            unread_message_count: 0,
            memberType: data.memberType
        };

        getMembers(conv.id).then((resp) => {
            if (resp.err) {
                console.error(resp.err);
            }
            else {
                var members = resp.re.members;
                conv.members = members.map((m) => {
                    return {userId: m.userId, name: m.name};
                });

                resolve(conv);
            }
        });
    });
}

function getMembers(conv_id) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = {
                conversationId: conv_id
            }
            Lotus.ChatService.Conversation.getMembers(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        });
    });
}

function addMembers(conv_id, ...memberIds: string[]) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = {
                conversationId: conv_id,
                memberIds: memberIds
            }

            Lotus.ChatService.Conversation.addMembers(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        })
    });
}

function findOne(userId: string) {
    return store.getState().conversationData.conversations.find((c) => {
        return c.type == 0 && getPartner(c).userId == userId;
        //return c.members.length == 1 && c.members[0] == userId;
    });
}

function getById(conv_id: string) {
    return new Promise<IConversation>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = { conversationId: conv_id };
            Lotus.ChatService.Conversation.getById(data, (error, result) => {
                if (error) console.error(error);
                else {
                    convert(result.conversation).then((conv) => resolve(conv));
                }
            });
        });
    });
}

function updateTitle(conv_id: string, title: string) {
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var data = {
                conversationId: conv_id,
                title: title
            }

            Lotus.ChatService.Conversation.updateTitle(data, (error, result) => {
                resolve({ err: error, re: result });
            });
        });
    });
}

function getLastConversations() {
    return new Promise<IConversation[]>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            var param = {
                options: {
                    pageSize: 100,
                    messageId: null
                }
            }
            Lotus.ChatService.Conversation.getPreviousPage(param, (error, result) => {
                if(error) console.error(error);
                else {
                    var convConverters = result.conversations.map((c) => {
                        return convert(c);
                    });

                    Promise.all<IConversation>(convConverters).then((cons) => {
                        resolve(cons);
                    });
                }
            });
        });
    });
}

function deleteConversation(conv_id){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            Lotus.ChatService.Conversation.delete({conversationId: conv_id}, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

function leaveConversation(conv_id){
    return new Promise<any>((resolve) => {
        LotusService.singleton().ready().then((Lotus) => {
            Lotus.ChatService.Conversation.leaveGroup({conversationId: conv_id}, (error, result) => {
                resolve({err: error, re: result});
            });
        });
    });
}

function getPartner(conv: IConversation){
    var owner = store.getState().userData.user;
    for(var i = 0; i < conv.members.length; i++){
        var m = conv.members[i];
        if(m.userId != owner.userId){
            return m;
        }
    }

    return null;
}

export { 
    getPartner,
    createOne, 
    findOne, 
    createGroup, 
    getById, 
    convert, 
    getMembers, 
    addMembers, 
    updateTitle, 
    getLastConversations,
    deleteConversation,
    leaveConversation
};