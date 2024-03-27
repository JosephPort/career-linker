require('dotenv').config()

const express = require('express')
const authRoutes = require('./routes/auth')
const listingRoutes = require('./routes/listing')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(listingRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Listening on port 4000');
    })
  })
  .catch((err) => {
    console.log(err)
  }
)