const express = require('express')
const { createListing, getUserListing, getAllListings, getSingleListing, applyListing } = require('../controllers/listingController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/listings', getAllListings)
router.post('/create-listing', protect, createListing)
router.post('/apply/:listingID', protect, applyListing)
router.get('/get-listings', protect, getUserListing)
router.get('/get-listing/:id', getSingleListing)


module.exports = router