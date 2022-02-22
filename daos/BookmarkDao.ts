/**
 * @file Implements DAO managing data storage of follows. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import bookmarkModel from "../mongoose/Bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * Implements Data Access Object managing data storage of Bookmarks
 * This interacts with controller
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns likeDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao == null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Retrieve all users bookmarked the same tuit
     *
     * @param  {string} tid the PK of tuit to find users bookmarked it
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        bookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();

    /**
     * Retrieve all tuits a user bookmarked
     *
     * @param  {string} uid the PK of  user to find tuits bookmarked
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        bookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Insert an instance that a specific user bookmarks a tuit
     *
     * @param  {string} uid the PK of user to bookmarks another
     * @param {string} tid PK of the other user
     * @returns Promise To be notified when the bookmark created
     * database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        bookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Delete an instance that a specific user unbookmarks a tuit
     *
     * @param  {string} uid the PK of user to unbookmark
     * @param {string} tid PK of the other user
     * @returns Promise To be notified when the unbookmark removed
     * database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        bookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});

    /**
     * Delete all instances that a specific user unbookmarks all tuits
     *
     * @param  {string} uid the PK of user to unbookmark
     * @returns Promise To be notified when the unbookmark removed
     * database
     */
    userUnbookmarksAllTuit = async (uid: string): Promise<any> => bookmarkModel.deleteMany({bookmarkedBy: uid});
}