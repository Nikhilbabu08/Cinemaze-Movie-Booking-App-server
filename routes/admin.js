import express from 'express'
import { ADLogout, login, signup } from '../controller/admin-controller.js';


const router = express.Router();

// Define routes
router.post("/signup", signup)
router.post("/login", login)
router.post('/logout',ADLogout)

// Export router
export { router as adminRouter };