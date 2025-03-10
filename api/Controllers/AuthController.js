import User from '../Models/UserSchema.js'
import bcrypt from 'bcryptjs'
import Agent from '../Models/AgentSchema.js'
import Jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    const { username, email, password,role,licenseNumber,agency,phone } = req.body
        console.log(req.body)
        console.log(role)
    try {
        let user = null
        
        if (role === 'user') {
            user = await User.findOne({ email })
        }
        else if (role === 'agent') {
            user = await Agent.findOne({ email })
        }
        if (user) {
             return res.status(400).json({ message: 'User already exists' })
        }
        const hashPass = bcrypt.hashSync(password, 10)
        if (role === 'user') {
            user = new User({
                username,
                email,
                password: hashPass,
                role
            })
        }

        if (role === 'agent') {
            user = new Agent({
                username,
                email,
                password: hashPass,
                role,
                licenseNumber,
                phone,
                agency
            })
        }

        console.log(user)
        await user.save()
        res.status(200).json({ success: true, message: 'User successfully created',data:user })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' })
        console.log(error)
    }

}

export const signin = async (req, res) => {
    
    const { email, password,licenseNumber } = req.body
    try {
            let user = null;
            const users = await User.findOne({ email })
            const agent = await Agent.findOne({ email ,licenseNumber})
    
            if (users) {
                user = users;
            }
            if (agent) {
                user = agent
            }
            if (!user) {
                return res.status(404).send({ message: 'User Not Found' })
            }
        const checkCorrectPass = bcrypt.compareSync(req.body.password, user.password)
        
        console.log("checkCorrectPass", checkCorrectPass)

        if (!checkCorrectPass) {
            return res.status(401).json({ message: false, message: 'Incorrect password ' })
        }
        console.log("passcheck successful")
        const { password,...rest } = user._doc // extract password
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