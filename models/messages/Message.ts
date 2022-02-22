/**
 * @file Declares Message data type representing relationship between
 * of messaging systems
 */

import Tuit from "../Tuit";
import User from "../User";

/**
 * @typedef Message Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {Tuit} tuit Tuit being liked
 * @property {User} likedBy User liking the tuit
 */
export default interface Message{
    sender: User;
    receiver: User;
    message: String;
    sentOn: Date;
}