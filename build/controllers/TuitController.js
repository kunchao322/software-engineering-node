"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *     The controller will respond to HTTP methods GET, POST, PUT, and DELETE
 */
class TuitController {
    constructor(app, tuitDao) {
        this.createTuit = (req, res) => this.tuitDao.createTuit(req.body).then((tuit) => res.json(tuit));
        this.findAllTuits = (req, res) => this.tuitDao.findAllTuits()
            .then((tuits) => res.json(tuits));
        this.findTuitsByUser = (req, res) => this.tuitDao.findTuitsByUser(req.params.uid)
            .then((tuits) => res.json(tuits));
        this.findTuitById = (req, res) => this.tuitDao.findTuitById(req.params.uid)
            .then((tuit) => res.json(tuit));
        this.updateTuit = (req, res) => this.tuitDao.updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
        this.deleteTuit = (req, res) => this.tuitDao.deleteTuit(req.params.uid)
            .then((status) => res.send(status));
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get("/tuits", this.findAllTuits);
        this.app.get("/tuits/tid", this.findTuitById);
        this.app.get("/users/:uid/tuits", this.findTuitsByUser);
        this.app.post("/tuits", this.createTuit);
        this.app.delete("/tuits/:tid", this.deleteTuit);
        this.app.put("tuits/:tid", this.updateTuit);
    }
    createTuitByUser(req, res) {
        throw new Error("Method not implemented.");
    }
}
exports.default = TuitController;
