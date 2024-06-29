import Listing from "../Models/ListingSchema.js"

export const createListing = async(req,res) =>{
try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
} catch (error) {
    res.status(500).json({status:false, message:"Enable to create Listing"})
}
}