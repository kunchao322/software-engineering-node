"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
class UserController {
    constructor() {
        this.findAllUsers = (req, res) => UserController.userDao.findAllUsers()
            .then(users => res.json(users));
        this.findUserById = (req, res) => UserController.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        this.createUser = (req, res) => UserController.userDao.createUser(req.body)
            .then(user => res.json(user));
        this.deleteUser = (req, res) => UserController.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        this.updateUser = (req, res) => UserController.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
    }
}
exports.default = UserController;
// private static app: Express;
UserController.userController = null;
UserController.userDao = UserDao_1.default.getInstance();
UserController.getInstance = (app) => {
    if (UserController.userController === null) {
        UserController.userController = new UserController();
        // RESTful User Web service API
        app.get("/users", UserController.userController.findAllUsers);
        app.get("/users/:uid", UserController.userController.findUserById);
        app.post("/users", UserController.userController.createUser);
        app.put("/users/:uid", UserController.userController.updateUser);
        app.delete("/users/:uid", UserController.userController.deleteUser);
    }
    return UserController.userController;
};
