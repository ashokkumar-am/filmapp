let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const MovieSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        rating: { type: Number, default: 1, enum: [1, 2, 3, 4, 5] },
        genre: { type: Array, default: [], required: true },
        moviePhoto: { type: String, required: true },
        ticketPrice: { type: Number, required: true },
        movieSlug: { type: String, slug: "name", unique: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'movieComments' }],
        status: { type: Number, default: 1 },
    },
    {
        timestamps: true,
    },
);

const movie = mongoose.model("movie", MovieSchema);

module.exports = movie;