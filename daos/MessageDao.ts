/**
 * @file Implements DAO managing data storage of messages. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessgaeDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/Message/MessageModel";

/**
 * Implements Data Access Object managing data storage of Messages
 * This interacts with controller
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    private constructor() {}

    /**
     * Creates singleton DAO instance
     * @returns messageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    /**
     * insert instance when a user send message to another user
     *
     * @param  {Message} message the content body of message created
     * @returns Promise To be notified when the message is created and inserted to database
     */
    async userSendMessageToOther(message: Message): Promise<Message> {
        return MessageModel.create(message);
    }

    /**
     * A particular user can count the message sent
     *
     * @param  {string} uid the PK of particular user
     * @returns Promise To be notified when the result is retrieved from
     * database
     */
    async userCountMessageSent(uid: string): Promise<number> {
        console.log(await  MessageModel.find({sender: uid}).count());
        return MessageModel.find({sender: uid}).populate("message").count();
    }

    /**
     * Delete all messages a user sent out and received.
     *
     * @param  {string} uid the PK of user
     * @returns Promise To be notified when all results are removed
     */
    async userDeleteAllMessage(uid: string): Promise<any> {
        return MessageModel.deleteMany({$or:[{sender: uid}, {receiver: uid}]});
    }

    /**
     * Particular user can delete particular messgae
     *
     * @param  {string} uid the PK of user
     * @param {string} mid the PK of message to be deleted
     * @returns Promise To be notified when all results are removed
     */
    async userDeleteMessage(uid: string, mid: string): Promise<any> {
        return MessageModel.deleteOne({sender: uid})  ;
    }

    /**
     * Retrieve all messages of a particular user received
     *
     * @param  {string} uid the PK of user
     * @returns Promise To be notified when the messagaes are retrieved from
     * database
     */
    async userFindMessagesReceived(uid: string): Promise<Message[]> {
        return MessageModel.find({receiver: uid});
    }

    /**
     * Retrieve a message of a particular user sent
     *
     * @param  {string} uid the PK of user
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    async userFindMessagesSent(uid: string): Promise<Message[]> {
        return MessageModel.find({sender: uid});
    }

    /**
     * Retrieve all messages of a particular user send to another user
     *
     * @param  {string} uida the PK of user
     * @param  {string} uidb the PK of another user
     * @returns Promise To be notified when the messagaes are retrieved from
     * database
     */
    async findAllMessagesSentToOther(uida: string, uidb: string):  Promise<Message[]> {
    return MessageModel.find({$and: [{sender: uida}, {receiver: uidb}]});
}
}
