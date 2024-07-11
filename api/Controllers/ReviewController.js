import Review from "../Models/ReviewSchema.js"
import Listing from "../Models/ListingSchema.js"

export const CreateReview = async (req, res,) => {
    const ListingId = req.params.ListingId;
    const userId = req.user.id;
    console.log("Userid",userId)
    console.log('ListingId',ListingId)
    const newReview = new Review({
        ...req.body,
        user: userId,
        ListingId: ListingId
    });
    try {
        const savedReview = await newReview.save()
        await Listing.findByIdAndUpdate(ListingId, {
            $push: { reviews: savedReview._id }
        })

        await savedReview.populate('user', 'username');

        res.status(200).json({ success: true, message: "Review created successfully", data: savedReview })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}




export const getalReviews = async (req, res) => {
    const { listingId } = req.params;
    try {
        const reviews = await Review.find({listing: listingId}).populate('user', 'username');;
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};