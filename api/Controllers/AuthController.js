import User from '../Models/UserSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    // hashing password
    const hashPass = bcrypt.hashSync(password, 10)

    try {
        const newUser = new User({ username, email, password: hashPass })
        await newUser.save()


        res.status(200).json({ success: true, message: 'User Created successfully', data: newUser })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Invalid Credentials !!! Please Check' })
        
    }
}


export const signin = async (req, res) => {
    const email = req.body.email
    
    try {
        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(404).json({ message: false, message: 'User not found' })
        }
        
        const checkCorrectPass = bcrypt.compare(req.body.password, user.password)
        
        if (!checkCorrectPass) {
            return res.status(401).json({ message: false, message: 'Incorrect password or email !!! Please Check ' })
        }
        const {password,...rest} = user._doc // extract password
        
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET_KEY)
        
        res.cookie('accessToken', token, {
            httpOnly: true
        }).status(200).json({ success: true, message: "Successfully Login", data: { ...rest }, token })
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'User Not Found' })
    }
}