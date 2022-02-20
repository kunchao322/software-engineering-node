import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import User from "../models/User";

/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
export default class UserController implements UserControllerI {
    // private static app: Express;
    private static userController: UserController | null = null;
    private static userDao : UserDao = UserDao.getInstance();

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

    findAllUsers = (req: Request, res: Response) =>
        UserController.userDao.findAllUsers()
            .then(users => res.json(users));

    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));

    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body)
            .then(user => res.json(user));

    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid)
            .then(status => res.json(status));

    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body)
            .then(status => res.json(status));

}
