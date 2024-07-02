import User from '../Models/UserSchema.js'
import bcrypt from 'bcryptjs'
import { response } from 'express'
import Jwt from 'jsonwebtoken'


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
    console.log(email)
    try {
        const user = await User.findOne({ email })
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: false, message: 'User not found' })

        }
        // error handling done
        const checkCorrectPass = bcrypt.compareSync(req.body.password, user.password)
        console.log("checkCorrectPass", checkCorrectPass)

        if (!checkCorrectPass) {
            return res.status(401).json({ message: false, message: 'Incorrect password ' })
        }
        console.log("passcheck successful")
        const { password, ...rest } = user._doc // extract password
        console.log("pass", password)

        const token = Jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET_KEY)

        res.cookie('accessToken', token, {
            httpOnly: true
        }).status(200).json({ success: true, message: "Successfully Login", data: { ...rest }, token })

    } catch (error) {
        res.status(500).json({ success: false, message: 'User Not Found' })
    }
}

export const google = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log("user in backend",user)
        if (user) {
            const token = Jwt.sign({
                id: user._id,
            }, process.env.JWT_SECRET_KEY)

            const { password: pass, ...rest } = user._doc
            
            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json({ success: true, message: "Successfully Login", data: { ...rest }, token })
        }
         else {
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            
            const hashPass = bcrypt.hashSync(generatedPass, 10)
            const newUser = new User({name:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), email:req.body.email,password:hashPass , avatar:req.body.photo})
            
            await newUser.save()
            
            const token = Jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY)
            const { password: pass, ...rest } = newUser._doc

            res.cookie('accessToken', token, {
                httpOnly: true
            }).status(200).json({ success: true, message: "Successfully Login", data: { ...rest }, token })

        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid Credentials" })
    }
}

export const signOut = async(req,res) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).json({ success: true, message:'user has logged out'})

    } catch (error) {
        res.status(500).json({ success: false, message: "Invalid Credentials" })
    }
}