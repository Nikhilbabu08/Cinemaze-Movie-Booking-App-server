import express from "express"
import { deleteBooking, getBookingById, getBookings, newBooking } from "../controller/booking-controller.js"

const router = express.Router()

// Define routes
router.post('/',newBooking)
router.get('/',getBookings)
router.get('/:id',getBookingById)
router.delete('/:id',deleteBooking)


// Export router
export { router as bookingRouter };