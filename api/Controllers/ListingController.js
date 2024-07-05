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
    if (!list) {
        return res.status(404).json({ status: false, message: "Listing not found" });
    }

    if (req.user.id !== list.userRef) {
        return res.status(401).json({ status: false, message: "you can delete your Own" })
    }
    try {
        const list = await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Successfully deleted', list)
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })

    }
}


export const UpdateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    console.log(listing)
    if (!listing) {
        res.status(404).json({ status: false, message: "Listing not found" })
    }

    if (req.user.id !== listing.userRef) {
        return res.status(401).json({ status: false, message: "you can delete your Own" })
    }

    try {
        const UpdatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({ status: true, message: "Successfully Update listing", UpdatedListing })
    } catch (error) {
        res.status(500).json(error.message)
    }

}

export const GetListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
        console.log("listing", listing)
        if (!listing) {
            res.status(404).json({ status: false, message: "Listing not found" })
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const GetListings = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offers = req.query.offers;

        if (offers === undefined || offers === "false") {
            //  if user not select offer then we should see both with or without offer properties
            offers = { $in: [false, true] }

        }

        let furnished = req.query.furnished

        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] }

        }
        let parking = req.query.parking

        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] }

        }
        let type = req.query.type

        if (type === undefined || type === "all") {
            type = { $in: ['sale', 'rent'] }
        }

        const searchTerm = req.query.searchTerm || "";

        const sort = req.query.sort || 'createdAt'
        const order = req.query.order || 'desc'

        const listings = await Listing.find({
            name: { $regex: searchTerm,$options:'i'},
            offers,
            parking,
            type,
            furnished,
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings)

    } catch (error) {
        res.status(404).json({ status: false, message: 'Listing not found' })
        console.log(error)
    }
}