import Jwt from 'jsonwebtoken'
import User from '../Models/UserSchema.js'
import Agent from '../Models/AgentSchema.js'

export const VerifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken
    console.log("TOKEN", token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized User' })
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(401).json({ success: false, message: 'Forbidden' })
            req.user = user;
            console.log("User", user)
            next()
        })

        const user = await User.findById(decoded.id);
        // let role = 'user';

        // if (!user) {
        //     user = await Agent.findById(decoded.id);
        //     role = 'agent';
        // }
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        console.log(user)
        next();
    }

    catch (error) {
    }
}


