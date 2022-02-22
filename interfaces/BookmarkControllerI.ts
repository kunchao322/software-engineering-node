import {Request, Response} from "express";
/**
 * @file Declares API for bookmark related controller methods
 */
export default interface BookmarkControllerI {
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksAllTuit(req: Request, res: Response): void;
};