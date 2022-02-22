import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import User from "../models/User";

/**
 * @class UserController Implements RESTful Web service API for user resource.
 * Defines the following HTTP endpoints:
 * GET /users to find all users
 * GET /users/:uid to find a particular user
 * POST /users to create a new user
 * PUT /users/:uid to update a particular user
 * DELETE /users/:uid to remove a particular user
 *
 * @property {UserDao} userDao Singleton DAO implementing tuit CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    private static userController: UserController | null = null;
    private static userDao : UserDao = UserDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return UserController
     */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();
            // RESTful User Web service API
            app.get("/users",
                UserController.userController.findAllUsers);
            app.get("/users/:uid",
                UserController.userController.findUserById);
            app.post("/users",
                UserController.userController.createUser);
            app.put("/users/:uid",
                UserController.userController.updateUser);
            app.delete("/users/:uid",
                UserController.userController.deleteUser);
        }
        return UserController.userController;
    }

    /**
     * Retrieves all users from the database and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * Retrieves a particular user from the database
     *
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));

    /**
     * Insert a user
     *
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * Delete a specific user
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    /**
     * Update a particular user base on the given user body info
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified and the user body to update to
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));

}
