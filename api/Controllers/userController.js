import bcrypt from 'bcryptjs';
import User from '../Models/UserSchema.js';
export const test = (req, res) => {
    res.json({
        message: 'test api route',
    })
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        await User.findByIdAndUpdate(id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true });
        res.status(200).json({ success: true, message: 'successfully updated', data: updateUser });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to update' })
    }
}