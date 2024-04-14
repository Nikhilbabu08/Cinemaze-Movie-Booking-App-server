import { Admin } from "../models/admin-model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() == "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const allowedAdminEmails = ['nikhil@gmail.com', 'akhil@gmail.com'];
    if (!allowedAdminEmails.includes(email)) {
        return res.status(401).json({ message: "You are not allowed to sign up as admin" });
    }

    const admin = await Admin.findOne({ email: email })
    if (admin) {
        return res.status(401).json({ message: "admin already existed" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newAdmin = new Admin({
        email: email,
        password: hashPassword
    })

    await newAdmin.save()

    return res.status(200).json({ message: "admin registed " })
}


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }

    const admin = await Admin.findOne({ email: email })

    if (admin) {
        const passwordCompare = await bcrypt.compare(password, admin.password)
        const token = Jwt.sign({ email: admin.email, id: admin._id }, process.env.SECRET_KEY, { expiresIn: "7d" })

        if (!passwordCompare) {
            return res.status(401).json({ message: 'Invalid Password' })
        } else {

            return res.status(200).json({ message: "login sucssess", token, admin: admin })
        }
    }

    if (!admin) {
        return res.status(401).json({ message: "admin  not found" });
    }


}

export const ADLogout = async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}