import {Request, Response} from "express";
/**
 * @file Declares API for message related controller methods
 */
export default interface MessageControllerI {
    userSendMessageToOther (req: Request, res: Response): void;
    userFindMessagesSent (req: Request, res: Response): void;
    userFindMessagesReceived (req: Request, res: Response): void;
    userDeleteMessage (req: Request, res: Response): void;
    userDeleteAllMessages (req: Request, res: Response): void;
    findAllMessagesSentToOther (req: Request, res: Response): void;
    // userCountMessageSent (req: Request, res: Response): void;
}