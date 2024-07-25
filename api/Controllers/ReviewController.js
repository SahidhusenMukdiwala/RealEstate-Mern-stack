import Review from "../Models/ReviewSchema.js"
import Listing from "../Models/ListingSchema.js"
import User from "../Models/UserSchema.js"

export const CreateReview = async (req, res,) => {
    const ListingId = req.params.ListingId;
    const userId = req.user.id;
    console.log("Userid",userId)
    console.log('ListingId',ListingId)
    const newReview = new Review({
        ...req.body,
        userId: userId,
        ListingId: ListingId,
    });
    try {
        const savedReview = await newReview.save()
        await Listing.findByIdAndUpdate(ListingId, {
            $push: { reviews: savedReview._id }
        })
        await User.findByIdAndUpdate(userId, {
            $push: { reviews: savedReview._id }
        })

        // await savedReview.populate('comment','rating');

        res.status(200).json({ success: true, message: "Review created successfully", data: savedReview })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getalReviews = async (req, res) => {
    const  ListingId  = req.params.id;
    console.log(ListingId)
    try {
        const reviews = await Review.find({ListingId: ListingId});
        console.log(reviews)
        res.status(200).json(reviews);
    } catch (error) {
    }
};

export const getUserReviews = async(req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId)
        const reviews = await Review.find({ userId:userId });
        res.status(200).json(reviews);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
}