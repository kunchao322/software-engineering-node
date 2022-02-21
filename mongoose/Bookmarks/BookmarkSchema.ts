
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/Bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "BookmarkModel"},
}, {collection: "bookmarks"});

export default BookmarkSchema;