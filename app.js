import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors'
import razorpay from 'razorpay'
import crypto from 'crypto'
import { userRouter } from "./routes/user.js";
import { adminRouter } from "./routes/admin.js";
import { movieRouter } from "./routes/movie.js";
import { bookingRouter } from "./routes/booking.js";
import { emailRouter } from "./routes/email.js";

const app = express()

dotenv.config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/user', userRouter)
app.use('/admin', adminRouter)
app.use('/movie', movieRouter)
app.use('/booking',bookingRouter)
app.use('/email',emailRouter)

const corsOptions = {origin:"http://localhost:3000"}
app.use(cors(corsOptions));

// Connect to MongoDB database using Mongoose.
mongoose.connect(`mongodb+srv://nikhilbabu80942:${process.env.MONGO_PWD}@cluster0.hbp6xss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err))


    const instance = new  razorpay({
        key_id : process.env.RAZORPAY_KEY,
        key_secret : process.env.RAZORPAY_SECRET
    })


    app.post('/checkout',  async(req,res,next)=>{
        const options = {
            amount:Number(req.body.amount),  // Amount is in currency subunits. Default is  50 paise.
            currency:"INR",  // Currency, defaults to INR.
        };
        const order = await instance.orders.create(options);
        console.log(order)
        res.status(200).json({success:true,order})
    })
    
    app.post('/verifyPayment',async (req,res,next)=> {
        const {razorpay_order_id, razorpay_payment_id,razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET).update(body.toString()).digest('hex')
        const isauth = expectedSignature === razorpay_signature;
        if (!isauth){
            await payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
        }else{
            res.status(400).json({success:false})
        }
    })

    app.get('/api/getkey',(req,res)=>{
        return res.status(200).json({key:process.env.RAZORPAY_KEY})
    })
    







app.listen(3001, () => console.log("connented to port  3001"))