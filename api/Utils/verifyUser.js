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
        //     console.log("agent",user)

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

    export const VerifyToken2 = async (req, res, next) => {
        const token = req.cookies.accessToken;
    
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized User' });
        }
    
        try {
            // Verify the token
            const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);
    
            // Check if the user is an agent or a regular user
            let user = await User.findById(decoded.id);
            if (!user) {
                user = await Agent.findById(decoded.id);
                if (!user) {
                    return res.status(401).json({ success: false, message: 'Invalid token' });
                }
                req.user = user;
                req.user.role = 'agent'; // Set role as 'agent'
            } else {
                req.user = user;
                req.user.role = 'user'; // Set role as 'user'
            }
    
            console.log("Authenticated User:", req.user);
            next();
        } catch (error) {
            console.error("Token Verification Error:", error);
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    };