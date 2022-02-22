/**
 * @file Declares Message data type representing relationship between
 * of messaging systems
 */

import User from "../User";

/**
 * @typedef Message Represents message relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {User} sender is the user who send the message
 * @property {User} receiver is the user received the message
 * @property {String} message is the content of message
 * @property {Date} sentOn is the time when send the message
 */
export default interface Message{
    sender: User;
    receiver: User;
    message: String;
    sentOn: Date;
}