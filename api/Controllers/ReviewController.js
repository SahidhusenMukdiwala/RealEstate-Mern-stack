import Review from "../Models/ReviewSchema.js"

export const CreateReview = async(req, res, ) =>{
    const { propertyId, userId, rating, comment } = req.body;
    // const createRev = new Review.create({propertyId, userId, rating, comment})
    const createRev = new Review({propertyId, userId, rating, comment})
    const saveRev = await createRev.save()
    console.log(saveRev)
    res.status(200).json({success: true,message: "Review created successfully",data: saveRev})
}