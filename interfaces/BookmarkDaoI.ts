import Bookmark from "../models/Bookmarks/Bookmark";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface BookmarkDaoI {
    findAllUsersThatBookmarkedTuit (tid: string): Promise<Bookmark[]>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (tid: string, uid: string): Promise<any>;
    userBookmarksTuit (tid: string, uid: string): Promise<Bookmark>;
};