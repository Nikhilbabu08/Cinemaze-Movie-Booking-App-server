import express from "express";
import { USLogout, login, signup } from "../controller/user-controller.js";


const router = express.Router();

// Define routes
router.post("/signup", signup)
router.post("/login", login)
router.post('/logout',USLogout)

// Export router
export { router as userRouter };