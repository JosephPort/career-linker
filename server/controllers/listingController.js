const Listing = require('../models/ListingModel')

const createListing = async (req, res) => {
  const { title, company, location, description } = req.body

  try {
    const creator = req.user._id

    const listing = await Listing.create({ title, company, location, description, creator })
    res.status(200).json({ 
      message: "Created Listing",
      listing: listing
    })
  } catch (err) {
    console.log(err.message)
  }
}

const getUserListing = async (req, res) => {
  const listings = await Listing.find({ 
    creator: req.user._id 
  })
  res.status(200).json(listings)
}

const getAllListings = async (req, res) => {
  const allListings = await Listing.find()
  res.status(200).json(allListings)
}

const getSingleListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  res.status(200).json(listing)
}

const applyListing = async (req, res) => {
  const listing = await Listing.findById(req.params.listingID)

  if(listing.applicants.includes(req.user._id)){
    return res.status(404).json({error: "Already applied"})
  }

  listing.applicants.push(req.user._id)
  try {
    await listing.save()
    res.status(200).json({ 
      message: "Added application",
    })
  } catch (err) {
    console.log(err.message)
  }
}

const viewApplicants = async (req, res) => {
  const listing = await Listing.findById(req.params.listingID)

  const users = await User.find({ _id: { $in: listing.applicants } });

  const applicantNames = users.map(user => `${user.first_name} ${user.last_name}`);

  return res.status(200).json({names: applicantNames})
}

module.exports = {
  createListing,
  getUserListing,
  getAllListings,
  getSingleListing,
  applyListing
}