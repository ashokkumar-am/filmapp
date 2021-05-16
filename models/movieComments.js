const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const MovieCommentSchema = new Schema(
    {
        comment: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        status: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    },
);

const movie = mongoose.model("movieComments", MovieCommentSchema)
module.exports = movie;