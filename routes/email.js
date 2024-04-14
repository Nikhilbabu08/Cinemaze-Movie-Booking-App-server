import express from "express"
import { email } from "../controller/email-controller.js";

const router = express.Router()

// Define routes
router.post('/',email)




// Export router
export { router as emailRouter };