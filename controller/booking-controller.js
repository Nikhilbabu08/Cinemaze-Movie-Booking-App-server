import { Booking } from "../models/booking-model.js";
import { User } from "../models/user-model.js";

export const newBooking = async (req,res,next)=>{
    const {movie,poster,date,time,seats} = req.body;
    const userId = req.body.user;

    if (!date ||  !time || time.trim() === "" || !seats || seats== "") {
        return res.status(400).json({ message: "All fields are required" });
    }
    let bookings;
    try{
        bookings = new Booking({
            movie,
            poster,
            date, 
            time,  
            seats,
            user : userId
        })
        await bookings.save();
        await User.findByIdAndUpdate(userId, { $push: { bookings: bookings._id } });
    }
    catch(err){
        return res.status(400).json({error: err });
    }
    if(!bookings)  
       return res.status(500).json({message:"No booking with that ID"}); 

   return res.status(201).json({bookings});
}

export const getBookings = async (req, res, next) => {
    const userId = req.query.user;
    try {
        const userBookings = await Booking.find({ user: userId })
        return res.status(200).json({ userBookings });
    } catch (error) {
        return res.status(500).json({ message: "There was a problem retrieving the Bookings." });
    }
}


export const getBookingById = async (req, res, next) => {
    const bookingId = req.params.id;
    let result;
    try {
        result = await Booking.findOne({ _id: bookingId });

        if (!result)
            return res.status(404).json({ message: 'The movie with the given ID does not exist.' });

    } catch (err) {
        return res.status(500).json({ message: "Error occured in fetching the movie" })
    }
    return res.status(200).json({ result });
};


//delete booking
export const deleteBooking = async (req, res, next) => {
    const bookingId = req.params.id;
    try {
        let result = await Booking.findOneAndDelete({ _id: bookingId });
        if (!result) {
            return res.status(404).json({ message: 'The movie with the given ID does not exist.' });
        }
        res.status(200).json({ message: "Deleted Successfully!", result });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
}