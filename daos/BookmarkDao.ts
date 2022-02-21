import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import bookmarkModel from "../mongoose/Bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao == null){
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        bookmarkModel
            .find({tuit: tid})
            .populate("bookmarkedBy")
            .exec();


    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        bookmarkModel
            .find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        bookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        bookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});

    userUnbookmarksAllTuit = async (uid: string): Promise<any> => bookmarkModel.deleteMany({bookmarkedBy: uid});
}