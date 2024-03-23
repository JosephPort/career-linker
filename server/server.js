require('dotenv').config()

const express = require('express')

const authRoutes = require('./routes/auth')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')

const app = express();

app.use(express.json())

app.use(authRoutes)

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null)
    return res.sendStatus(404)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) 
      return res.sendStatus(403)

    req.user = user
    next()
  })
}
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