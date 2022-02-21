/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";



/**
 * @class TuitController Implements RESTful Web service API for likes resource.
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
    private static FollowDao: FollowDao = FollowDao.getInstance();
    private static FollowController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
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
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFolloweesOfUser = (req: Request, res: Response) =>
        FollowController.FollowDao.findAllFolloweesOfUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllFollowersOfUser = (req: Request, res: Response) =>
        FollowController.FollowDao.findAllFollowersOfUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userAFollowB = (req: Request, res: Response) => {
        FollowController.FollowDao.userAFollowB(req.params.uida, req.params.uidb)
            .then(follows => res.json(follows));
    }

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unliking
     * the tuit and the tuit being unliked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the like was successful or not
     */
    userAUnfollowB = (req: Request, res: Response) => {
        FollowController.FollowDao.userAUnfollowB(req.params.uida, req.params.uidb)
            .then(status => res.send(status));
    }

    //TODO: return number should check on the return body
    countFollowees = (req: Request, res: Response) =>{
        FollowController.FollowDao.countFollowees(req.params.uid).then(
            followsCount => res.json(followsCount)
        );
    }

    countFollowers= (req: Request, res: Response) =>{
        FollowController.FollowDao.countFollowers(req.params.uid).then(
            followsCount => res.json(followsCount)
        );
    }

};