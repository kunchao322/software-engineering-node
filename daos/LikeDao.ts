/**
 * @file Implements DAO managing data storage of likes. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * Implements Data Access Object managing data storage of Likes
 * This interacts with controller
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    private constructor() {}

    /**
     * Creates singleton DAO instance
     * @returns likeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

    /**
     * Uses UserModel to retrieve all user documents from users collection
     * who like the same tuit
     *
     * @param  {string} tid the PK of user to find all tuits user likes
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieve all tuits a particular user liked
     *
     * @param  {string} uid the PK of user to find all tuits user likes
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Insert an instance that a specific user like a specific tuit
     *
     * @param  {string} uid the PK of user to find all tuits user likes
     * @param {string} tid PK of the particular tuit
     * @returns Promise To be notified when the like created
     * database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Delete an instance that a specific user like a specific tuit
     *
     * @param  {string} uid the PK of user to find all tuits user likes
     * @param {string} tid PK of the particular tuit
     * @returns Promise To be notified when the like is removed from
     * database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}