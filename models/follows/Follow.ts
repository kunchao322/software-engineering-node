/**
 * @file Declares Like data type representing relationship between
 *  * users and tuits, as in user likes a tuit
 */

import User from "../User";

/**
 * @typedef Follow Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} following users the a
 * @property {User} followedBy User followed by the other user
 */
export default interface Follow{
    blogger: User;
    follower: User;
}