const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: {
        type: String,
        require: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Image",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Comment", CommentSchema);