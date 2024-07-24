import Jwt from 'jsonwebtoken'
import User from '../Models/UserSchema.js'

export const VerifyToken = async(req, res, next) => {
    const token = req.cookies.accessToken
    console.log("TOKEN", token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized User' })
    }

    try {
      const decoded =   Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) return res.status(401).json({ success: false, message: 'Forbidden' })
            req.user = user;
            console.log("User", user)
            next()
        })
    
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user; 
        next();
    } 

    catch (error) {
    }

}

// export const VerifyUser = async(req, res, next) => {

// }