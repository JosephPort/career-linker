const express = require('express')
const { createListing, getUserListing, getAllListings, getSingleListing, applyListing, viewApplicants } = require('../controllers/listingController')
const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/listings', getAllListings)
router.get('/get-listing/:id', getSingleListing)
router.post('/create-listing', protect, createListing)
router.post('/apply/:id', protect, applyListing)
router.get('/get-listings', protect, getUserListing)
router.get('/get-applicants/:id', protect, viewApplicants)


module.exports = router