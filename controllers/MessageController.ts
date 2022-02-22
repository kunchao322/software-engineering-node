/**
 * @file Controller RESTful Web service API for Message resource
 */
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/Message/MessageModel";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * POST /users/:uida/messages/:uidb
 * GET /users/:uid/messages/sent
 * GET /users/:uid/messages/received
 * GET /users/:uid/messages/countsent
 * DELETE /users/:uid/messages/:mid
 * DELETE /users/:uida/messages/:uidb
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/users/:uida/messages/:uidb", MessageController.messageController.userSendMessageToOther);
            app.get("/users/:uid/messages/sent", MessageController.messageController.userFindMessagesSent);
            app.get("/users/:uid/messages/received", MessageController.messageController.userFindMessagesReceived);
            app.get("/users/:uida/messages/:uidb", MessageController.messageController.findAllMessagesSentToOther);
            app.delete("/users/:uid/messages/:mid", MessageController.messageController.userDeleteMessage);
            app.delete("/users/:uid/messages", MessageController.messageController.userDeleteAllMessages);
            app.get("users/:uid/count_messages_sent", MessageController.messageController.userCountMessageSent); //TODO

        }
        return MessageController.messageController;
    }

    private constructor() {
    }

    findAllMessagesSentToOther = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentToOther(req.params.uida, req.params.uidb)
            .then(message => res.json(message));

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    userSendMessageToOther = (req: Request, res: Response) =>
        MessageController.messageDao.userSendMessageToOther(req.body)
            .then(message => res.json(message));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    userFindMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.userFindMessagesSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userFindMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.userFindMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userDeleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteMessage(req.params.uid, req.params.mid)
            .then(messages => res.json(messages));


    userDeleteAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userDeleteAllMessage(req.params.uid)
            .then(status => res.json(status));

    userCountMessageSent = (req: Request, res: Response) => {
        console.log('Count in controller');
        console.log('uid');
        MessageController.messageDao.userCountMessageSent(req.params.uid).then(sentCount => res.json(sentCount));
    }
};