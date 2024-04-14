import { User } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() == "") {
        return res.status(400).json({ message: "All fields are required" });
    }


    const user = await User.findOne({ email: email })
    if (user) {
        return res.json({ message: "user already existed" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name: name,
        email: email,
        password: hashPassword
    })

    await newUser.save()
    return res.status(200).json({ message: "record registed " })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' })
    }
    const user = await User.findOne({ email: email })
    if (user) {
        const passwordCompare = await bcrypt.compare(password, user.password)
        const token = Jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
        if (!passwordCompare) {
            return res.status(401).json({ message: 'Invalid Password' })
        } else {

            return res.status(200).json({ message: "login sucssess",token,user})
        }
    }
    if (!user) {
        return res.status(401).json({ message: "user  not found" });
    }

}

export const USLogout = async (req, res) => {
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