/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Users
 * @property {TuitDao} tuitDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns tuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null){
            TuitDao.tuitDao = new TuitDao();
        }
        return  TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */
   async createTuit(tuit: Tuit): Promise<Tuit> {
        return TuitModel.create(tuit);
    }

    /**
     * Delete a selected tuit from database
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async deleteTuit(tid: string): Promise<any> {
        return TuitModel.deleteOne({tid});
    }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    async findAllTuits(): Promise<Tuit[]> {
        return TuitModel.find();
    }

    /**
     * Uses TuitModel to retrieve single user document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    async findTuitById(tid: string): Promise<any> {
        return TuitModel.findById(tid).populate("postedBy").exec();
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Find all tuits post by the same user
     * @param {string} uid Primary Key of user create tuits
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    /**
     * Find all tuits post by the same user
     * @param {string} uid Primary Key of user create tuits
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async findAllTuitsByUser(uid: string): Promise<Tuit[]> {
        return TuitModel.find({postedBy: uid});
    }

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database
     * @param {string} uid Primary Key of user create tuits
     * @returns Promise To be notified when tuit is inserted into the database
     */
    async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
        return TuitModel.create({...tuit, postedBy: uid});
    }
}
