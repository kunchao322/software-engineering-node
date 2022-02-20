"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
class TuitController {
    constructor() {
        this.createTuit = (req, res) => TuitController.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits()
            .then((tuits) => res.json(tuits));
        this.findTuitsByUser = (req, res) => TuitController.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits) => res.json(tuits));
        this.findTuitById = (req, res) => TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit) => res.json(tuit));
        this.updateTuit = (req, res) => TuitController.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
        this.deleteTuit = (req, res) => TuitController.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
        this.findAllTuitsByUser = (req, res) => {
            TuitController.tuitDao.findAllTuitsByUser(req.params.uid).then((tuits) => res.json(tuits));
        };
        this.createTuitByUser = (req, res) => {
            TuitController.tuitDao.createTuitByUser(req.params.uid, req.body).then((tuit) => res.json(tuit));
        };
    }
}
exports.default = TuitController;
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
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
};
