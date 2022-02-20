import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserControllerI";
import TuitControllerI from "../interfaces/TuitControllerI";
import TuitDao from "../daos/TuitDao";
import Tuit from "../models/Tuit";



/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao;
    private static tuitController: TuitController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.post("/users/:uid/tuits", TuitController.tuitController.createTuitByUser);
            app.get("/users/:tid/tuits", TuitController.tuitController.findAllTuitsByUser);
            app.get("/tuits/:tid", TuitController.tuitController.findTuitById);
            app.delete("/tuits/:tid", TuitController.tuitController.deleteTuit);
            app.put("/tuits/:tid", TuitController.tuitController.updateTuit);
            app.get("/tuits", TuitController.tuitController.findAllTuits);
            app.post("/tuits", TuitController.tuitController.findTuitById);
        }
        return TuitController.tuitController;
    }
    createTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuit(req.body).then((tuit: Tuit) => res.json(tuit));

    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));

    findTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    
    updateTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));

    deleteTuit = (req: Request, res: Response) =>
        TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));

    findAllTuitsByUser = (req: Request, res: Response) =>{
        TuitController.tuitDao.findAllTuitsByUser(req.params.uid).then((tuits: Tuit[]) => res.json(tuits));
    };

    createTuitByUser = (req: Request, res: Response) => {
        TuitController.tuitDao.createTuitByUser(req.params.uid, req.body).then((tuit: Tuit) => res.json(tuit));
    }
}
