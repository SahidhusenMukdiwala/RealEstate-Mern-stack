import Listing from "../Models/ListingSchema.js"

// export const createListing = async(req,res) =>{
//     const { name, description, address,regularPrice,discountPrice,bathrooms,bedrooms,furnished,parking,type,offers,imageUrls,userRef } = req.body

//     try {
//         const newListing = new Listing({name, description, address,regularPrice,discountPrice,bathrooms,bedrooms,furnished,parking,type,offers,imageUrls,userRef});
//         await newListing.save();
//         res.status(201).json(newListing);
//     } catch (err) {
//         console.log(err.message);
//         res.status(400).json({ message: err.message });
//     }
// }
export const createListing = async(req,res) =>{
try {
    const listing = await Listing.create(req.body)
    console.log(listing)
    return res.status(201).json({success:true,message:"Successfully Created",data:listing})
} catch (error) {
    res.status(500).json({status:false, message:error.message})
}
}