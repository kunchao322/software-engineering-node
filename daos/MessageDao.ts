import MessageDaoI from "../interfaces/MessgaeDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/Message/MessageModel";


export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userSendMessageToOther(message: Message): Promise<Message> {
        return MessageModel.create(message);
    }

    async userCountMessageSent(uid: string): Promise<number> {
        console.log('Count');
        console.log(await  MessageModel.find({sender: uid}).count());
        return MessageModel.find({sender: uid}).populate("message").count();
    }

    async userDeleteAllMessage(uid: string): Promise<any> {
        return MessageModel.deleteMany({$or:[{sender: uid}, {receiver: uid}]});
    }

    async userDeleteMessage(uid: string, mid: string): Promise<any> {
        return MessageModel.deleteOne({sender: uid})  ;
    }

    async userFindMessagesReceived(uid: string): Promise<Message[]> {
        return MessageModel.find({receiver: uid});
    }

    async userFindMessagesSent(uid: string): Promise<Message[]> {
        return MessageModel.find({sender: uid});
    }

    async findAllMessagesSentToOther(uida: string, uidb: string):  Promise<Message[]> {
    return MessageModel.find({$and: [{sender: uida}, {receiver: uidb}]});
}
}
