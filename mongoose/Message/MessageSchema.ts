/**
 * @file DataSchema to define Message attributes
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const messageSchema = new mongoose.Schema<Message>({
    sender: {type:Schema.Types.ObjectId, ref: "UserMode"},
    receiver: {type:Schema.Types.ObjectId, ref: "UserMode"},
    message: {type: Schema.Types.String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"})

export default messageSchema;