import Message from "../models/messages/Message";
/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI{
    userSendMessageToOther(message: Message):Promise<Message>;
    userFindMessagesSent(uid: string): Promise<Message[]>;
    userFindMessagesReceived(uid: string): Promise<Message[]>;
    userDeleteMessage(uid: string, mid: string): Promise<any>;
    userDeleteAllMessage(uid: string): Promise<any>;
    userCountMessageSent(uid: string): Promise<number>;
}