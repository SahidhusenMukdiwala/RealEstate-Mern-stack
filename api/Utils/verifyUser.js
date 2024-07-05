import Jwt from 'jsonwebtoken'
export const VerifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    console.log("TOKEN",token)
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized User' })
    }

    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ success: false, message: 'Forbidden' })
        req.user = user;
        console.log("User",user)
        next()
    })
}