import User from '../Models/UserSchema.js';
import Listing from '../Models/ListingSchema.js';
import Booking from '../Models/BookingSchema.js';
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

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.clearCookie('accessToken')
        res.status(200).json({ success: true, message: 'successfully deleted' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: 'Failed to delete' })
    }
}


export const getListing = async (req, res) => {
    if (req.user.id === req.params.id) {
        console.log("userid", req.user.id)
        console.log("parameter id", req.params.id)
        try {
            const listing = await Listing.find({ userRef: req.params.id });
            res.status(200).json(listing)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    else {
        res.status(500).json({ success: false, message: 'Failed to fetch list' })
    }

}

export const getUser = async (req, res) => {

    const user = await User.findById(req.params.id)
    try {
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' })
        }

        const { password: pass, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        res.json({ success: false, message: 'Something went wrong' })
    }

}

export const getMyBooking = async (req, res) => {

    try {
        const bookings = await Booking.find({ user: req.userId }).populate('listingId');
        // console.log(bookings);

        const listingIds = bookings.map(booking => booking.listingId._id);
        // console.log(listingIds);

        const listings = await Listing.find({ _id: { $in: listingIds } });
        res.status(200).json({ success: true, message: 'Appointments retrieved successfully', data: listings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went Wrong, Can not get Appointment' })
    }

}