const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // },
  // applicants: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: "User"
  // }
})

module.exports = mongoose.model("Listing", listingSchema)