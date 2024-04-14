import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie:{
        type:String,
        required:true
    },
    poster: {
        type: String,
        required: true
    },
    date:{
        type:String, 
        required:true
    },
    time:{
        type:String,
        require: true
    },
    seats:{
        type:String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
})

const bookingModel = mongoose.model("Booking", bookingSchema);

export { bookingModel as Booking };