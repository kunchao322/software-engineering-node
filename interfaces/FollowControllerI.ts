import {Request, Response} from "express";

export default interface FollowControllerI {
    userAFollowB (req: Request, res: Response): void;
    userAUnfollowB (req: Request, res: Response): void;
    findAllFollowersOfUser (req: Request, res: Response): void;
    findAllFolloweesOfUser (req: Request, res: Response): void;
    countFollowers (req: Request, res: Response): void;
    countFollowees (req: Request, res: Response): void;
};
