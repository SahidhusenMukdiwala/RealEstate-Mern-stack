import User from '../Models/UserSchema.js';
import Listing from '../Models/ListingSchema.js';
import Booking from '../Models/BookingSchema.js';
import Stripe from 'stripe';

export const CreateBooking = async (req, res) => {
    //     const listingId = await Listing.findById(req.params.listingId);
    //     const userId = await User.findById(req.user.id);

    // try {
    //     const booking = new Booking({
    //         listingId:listingId,
    //         userId:userId,
    //         Price: listingId.regularPrice - listingId.discountPrice
    //     })
    //     await booking.save() 

    //     res.status(200).json({success:true, message:'Booking Created successfully',data:booking})
    // } catch (error) {
    //     res.status(401).json({success:false, message:'something went wrong',error:error})

    // }


    try {
        const listingId = await Listing.findById(req.params.listingId)
        if (!listingId) {
            return res.status(404).json({ success: false, message: 'Listing not found' });
        }
        const userId = await User.findById(req.user.id)
        console.log(userId)
        if (!userId) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        if (!stripe) {
            throw new Error('Stripe initialization failed');
        }
        console.log("process.env.STRIPE_SECRET_KEY",process.env.STRIPE_SECRET_KEY)
// console.log("Stripe",stripe)
const imageUrls = Array.isArray(listingId.imageUrls) ? listingId.imageUrls : [listingId.imageUrls];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url: `${req.protocol}://${req.get('host')}/get/${listingId._id}`,
            customer_email: userId.email,
            client_reference_id: req.params.listingId,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        unit_amount: (listingId.regularPrice - listingId.discountPrice) * 100,
                        product_data: {
                            name: listingId.name,
                            description: listingId.description,
                            images: imageUrls
                        }
                    },
                    quantity: 1
                }
            ]
        })
        // console.log(session)

        // ============================ create new booking =================================

        const booking = new Booking({
            listingId: listingId._id,
            userId: userId._id,
            Price: listingId.regularPrice - listingId.discountPrice,
            session: session.id,
        })
        console.log(booking)
        await booking.save()

        res.status(200).json({ success: true, message: 'Successfully Paid', session })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Error creating checkout session' })
    }

}