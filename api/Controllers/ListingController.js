import Listing from "../Models/ListingSchema.js"

export const createListing = async (req, res) => {
    try {
        const listing = await Listing.create(req.body)
        console.log(listing)
        return res.status(201).json({ success: true, message: "Successfully Created", data: listing })
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

export const DeleteListing = async (req, res) => {
   
        const list = await Listing.findById(req.params.id)
        if(!list){
         return   res.status(404).json({ status: false, message:"Listing not found"});
        }

        if(req.user.id !== list.userRef){
           return res.status(401).json({ status: false, message:"you can delete your Own"})
        }
            try {
                const list = await Listing.findByIdAndDelete(req.params.id)
                res.status(200).json('Successfully deleted',list)
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })

    }
}


export const UpdateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    console.log(listing)
    if(!listing){
        res.status(404).json({ status: false, message:"Listing not found"})
    }

    if(req.user.id !== listing.userRef){
        return res.status(401).json({ status: false, message:"you can delete your Own"})
     }

     try {
       const UpdatedListing =  await  Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).json({ status: true, message: "Successfully Update listing",UpdatedListing})
      } catch (error) {
        res.status(500).json(error.message)
     }

}

export const GetListing =async (req,res)=>{
try {
    const listing = await Listing.findById(req.params.id)
    console.log(listing)
    if(!listing){
        res.status(404).json({ status: false, message:"Listing not found"})
    }
    res.status(200).json(listing)
} catch (error) {
    res.status(404).json(error.message)
}
}