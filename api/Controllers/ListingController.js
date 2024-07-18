import Agent from "../Models/AgentSchema.js";
import Listing from "../Models/ListingSchema.js"

export const createListing = async (req, res,) => {

    try {
        const { name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, offers, type, imageUrls, agentId,userRef } = req.body;

        const agentExists = await Agent.exists({ _id: agentId });
        if (!agentExists) {
            return res.status(400).json({ error: 'Invalid agent ID' });
        }

        const listing = new Listing({
            name,
            description,
            address,
            regularPrice,
            discountPrice,
            bathrooms,
            bedrooms,
            furnished,
            parking,
            offers,
            type,
            imageUrls,
            userRef,
            agent: agentId,
        });
        await listing.save();

        await Agent.findByIdAndUpdate(agentId, { $push: { listings: listing._id } });
        console.log(listing)

        res.status(201).json({ message: 'Listing created successfully', listing });
    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({ error: 'Internal server error' });
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
        const listing = await Listing.findById(req.params.id).populate('agent','username bio')
        console.log("listing", listing)
        if (!listing) {
            res.status(404).json({ status: false, message: "Listing not found" })
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(404).json(error.message)
    }
}


// Most important portion bcoz in this we sort all the things and add limits.

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
            name: { $regex: searchTerm, $options: 'i' },
            offers,
            parking,
            type,
            furnished,
        }).sort(
            { [sort]: order }
        ).limit(limit).skip(startIndex);

        return res.status(200).json(listings)

    } catch (error) {
        res.status(404).json({ status: false, message: 'Listing not found' })
        console.log(error)
    }
}