import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    genre: [{
        type: String,
        required: true
    }],
    releaseDate: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    bookingStartDate:{
        type:String,
        required:true
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

const movieModel = mongoose.model("Movie", movieSchema);

export { movieModel as Movie };