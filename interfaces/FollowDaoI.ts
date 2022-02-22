import User from "../models/User";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userAFollowB (tid: string, uid: string): Promise<User>;
    userAUnfollowB (tid: string, uid: string): Promise<any>;
    findAllFollowersOfUser (tid: string): Promise<User[]>;
    findAllFolloweesOfUser (uid: string): Promise<User[]>;
    countFollowers (uid: string): Promise<number>;
    countFollowees (uid: string): Promise<number>;
};