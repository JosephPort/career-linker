const Listing = require('../models/ListingModel')
const User = require('../models/UserModel')

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
    res.status(404).json({ error: "Failed to create listing" })
  }
}

const getUserListing = async (req, res) => {
  try{
    const listings = await Listing.find({ 
      creator: req.user._id 
    })
    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getAllListings = async (req, res) => {
  try{
    const allListings = await Listing.find()
    res.status(200).json(allListings)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const getSingleListing = async (req, res) => {
  try{
    const listing = await Listing.findById(req.params.id)
    res.status(200).json(listing)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const applyListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)

    if(listing.applicants.includes(req.user._id)){
      return res.status(404).json({error: "Already applied"})
    }

    listing.applicants.push(req.user._id)

    await listing.save()
    res.status(200).json({ 
      message: "Added application",
    })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

const viewApplicants = async (req, res) => {
  try{
    const listing = await Listing.findById(req.params.id)

    if (!listing){
      return res.status(400).json({
        error: "Listing not found"
      })
    }

    const users = await User.find({ _id: { $in: listing.applicants } });

    if (!users){
      return res.status(400).json({
        error: "No users found"
      })
    }

    //If users exist then we should map through them and return their names
    const applicantNames = users.map(user => `${user.first_name} ${user.last_name}`);

    return res.status(200).json({
      names: applicantNames,
      listing: listing
    })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  getAllListings,
  getSingleListing,
  getUserListing,
  viewApplicants,
  createListing,
  applyListing
}