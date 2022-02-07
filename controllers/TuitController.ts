import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import TuitControllerI from "../interfaces/TuitControllerI";
import TuitDao from "../daos/TuitDao";
import {stat} from "fs";
import Tuit from "../models/Tuit";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";


/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;

    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get("/tuits", this.findAllTuits);
        this.app.get("/tuits/tid", this.findTuitById);
        this.app.get("/users/:uid/tuits", this.findTuitsByUser);
        this.app.post("/tuits", this.createTuit);
        this.app.delete("/tuits/:tid", this.deleteTuit);
        this.app.put("tuits/:tid", this.updateTuit);

    }

    createTuit = (req: Request, res: Response) =>
        this.tuitDao.createTuit(req.body).then((tuit: Tuit) => res.json(tuit));

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        this.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    
    updateTuit = (req: Request, res: Response) =>
        this.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));

}
