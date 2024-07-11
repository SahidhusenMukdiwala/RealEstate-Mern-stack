import Review from "../Models/ReviewSchema.js"
import Listing from "../Models/ListingSchema.js"

export const CreateReview = async (req, res,) => {
    const ListingId = req.params.ListingId;
    const userId = req.user.id;
    console.log(ListingId)
    const newReview = new Review({
        ...req.body,
        userId: userId,
        ListingId: ListingId
    });
    try {
        const savedReview = await newReview.save()
        await Listing.findByIdAndUpdate(ListingId, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({ success: true, message: "Review created successfully", data: savedReview })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}




export const getalReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};