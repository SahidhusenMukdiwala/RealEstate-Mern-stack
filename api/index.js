import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from '../api/routes/user.js'
import authRouter from '../api/routes/Auth.js'
import listingRouter from '../api/routes/listing.js'
import agentRouter from '../api/routes/Agent.js'
import reviewRouter from '../api/routes/review.js'

dotenv.config()
const app = express(); 
const port = process.env.PORT || 8000

// ============================= Routes ===================================
app.use(express.json()); // This allow json as a input at the server side
app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/agent',agentRouter)
app.use('/api/listing',listingRouter)
app.use('/api/review',reviewRouter)

// ============================= Database Connection =============================
const connect = async()=>{
    try {
    mongoose.connect(process.env.MONGO_DB_URI)
        console.log('MongoDB successfully connected')
    } catch (error) {
        console.log('MongoDB Database connection Failed: ' + error)
    }
}

//  ============================ Middleware =============================================

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// ========================= App listen ============================================

app.listen(port, () => {
    connect()
    console.log(`Server listening on ${port}`)
}
)