/**
 * @file Implements DAO managing data storage of follows. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import User from "../models/User";
import FollowModel from "../mongoose/Follows/FollowModel";

/**
 * Implements Data Access Object managing data storage of Follows
 * This interacts with controller
 */
export default class FollowDao implements FollowDaoI{
    private static followDao: FollowDao | null  = null;
    private constructor() {}

    /**
     * Creates singleton DAO instance
     * @returns followDao
     */
    public static getInstance = (): FollowDao =>{
        if(FollowDao.followDao == null){
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    /**
     * Retrieve all followees of a particular user
     *
     * @param  {string} uid the PK of user to find all followees
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
   async findAllFolloweesOfUser(uid: string): Promise<User[]> {
        return FollowModel.find({follower: uid}).populate("blogger");
    }

    /**
     * Retrieve all followers of a particular user
     *
     * @param  {string} uid the PK of user to find all followers
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    async findAllFollowersOfUser(uid: string): Promise<User[]> {
        return FollowModel.find({blogger: uid}).populate("follower");
    }

    /**
     * Count a particular user's followees
     *
     * @param  {string} uid the PK of user to count
     * @returns Promise To be notified when the like created
     * database
     */
    async countFollowees(uid: string): Promise<number> {
        return FollowModel.find({follower: uid}).populate("blogger").count();
    }

    /**
     * Count a particular user's followers
     *
     * @param  {string} uid the PK of user to count
     * @returns Promise To be notified when the like created
     * database
     */
    async countFollowers(uid: string): Promise<number> {
        return FollowModel.find({blogger: uid}).populate("follower").count();
    }

    /**
     * Insert an instance that a specific user follows another
     *
     * @param  {string} uidA the PK of user to follow another
     * @param {string} uidB PK of the other user
     * @returns Promise To be notified when the follow created
     * database
     */
    async userAFollowB(uidA: string, uidB: string): Promise<any> {
        return FollowModel.create({follower: uidA, blogger: uidB});
    }

    /**
     * Delete an instance when a specific user unfollows another
     *
     * @param  {string} uidA the PK of user to unfollow another
     * @param {string} uidB PK of the other user
     * @returns Promise To be notified when the unfollow removed from
     * database
     */
    async userAUnfollowB(uidA: string, uidB: string): Promise<any> {
        return FollowModel.deleteOne({follower: uidA, blogger: uidB});
    }
}