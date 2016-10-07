import LotusService from '../lotus-service';

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
                resolve({err: error, re: result});
            });
        })
    });
}

export { getMembers, addMembers };