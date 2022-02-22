/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";



/**
 * @class FollowController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * POST /users/:uida/follows/:uidb
 * DELETE /users/:uida/follows/:uidb
 * GET /users/:uid/following
 * GET /users/:uid/followers
 * GET /users/:uid/countfollowers
 * GET /users/:uid/countfollowees
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static FollowController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.FollowController === null) {
            FollowController.FollowController = new FollowController();

            app.post("/users/:uida/follows/:uidb", FollowController.FollowController.userAFollowB);
            app.delete("/users/:uida/follows/:uidb", FollowController.FollowController.userAUnfollowB);
            app.get("/users/:uid/following", FollowController.FollowController.findAllFolloweesOfUser);
            app.get("/users/:uid/followers", FollowController.FollowController.findAllFollowersOfUser);
            app.get("/users/:uid/countfollowers", FollowController.FollowController.countFollowers);
            app.get("/users/:uid/countfollowees", FollowController.FollowController.countFollowees);
        }
        return FollowController.FollowController;
    }

    private constructor() {}

    /**
     * Retrieves all followees of a particular user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFolloweesOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFolloweesOfUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all followers of a particular user
     *
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllFollowersOfUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowersOfUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Create an instance that user A follow B
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uida and uidb representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userAFollowB = (req: Request, res: Response) => {
        FollowController.followDao.userAFollowB(req.params.uida, req.params.uidb)
            .then(follows => res.json(follows));
    }

    /**
     * Remove an instance that user A follow B
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uida and uidb representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userAUnfollowB = (req: Request, res: Response) => {
        FollowController.followDao.userAUnfollowB(req.params.uida, req.params.uidb)
            .then(status => res.send(status));
    }

    /**
     * Count a particular users' followees
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user
     * @param {Response} res Represents response to client, including the
     * number of all followees
     */
    countFollowees = (req: Request, res: Response) =>{
        FollowController.followDao.countFollowees(req.params.uid).then(
            followsCount => res.json(followsCount)
        );
    }

    /**
     * Count a particular users' followers
     *
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user
     * @param {Response} res Represents response to client, including the
     * number of all followers
     */
    countFollowers= (req: Request, res: Response) =>{
        FollowController.followDao.countFollowers(req.params.uid).then(
            followsCount => res.json(followsCount)
        );
    }

};