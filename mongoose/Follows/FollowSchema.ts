/**
 * @file DataSchema to define Follow attributes
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    blogger: {type: Schema.Types.ObjectId, ref: "UserModel"},
    follower: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});

export default FollowSchema;