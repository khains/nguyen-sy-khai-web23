const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    photo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        require: true,
    },
    description: {
        String,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    }, 
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Image", ImageSchema);