/**
 * @file Declares Like data type representing relationship between
 *  * users and tuits, as in user likes a tuit
 */

import User from "../User";

/**
 * @typedef Follow Represents follows relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} blogger as the user who post the tuit
 * @property {User} followedBy as the follower who start the following action
 */
export default interface Follow{
    blogger: User;
    follower: User;
}