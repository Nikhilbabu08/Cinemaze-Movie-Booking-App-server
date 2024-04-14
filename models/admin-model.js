import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

const adminModel = mongoose.model("Admin", adminSchema);

export { adminModel as Admin };