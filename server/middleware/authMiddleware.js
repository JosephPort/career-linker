const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
require('dotenv').config()

const protect = async (req, res, next) => {
  if (req.headers.authorization.startsWith('Bearer')) 
  {
    try {
      const token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await User.findById(decoded.id).select('-hashed_pass')

      next()
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
  else{
    res.status(401).json({ message: 'Verification failed' })
  }
}

module.exports = { protect }