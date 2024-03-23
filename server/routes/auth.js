const express = require('express')
const router = express.Router()
const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', async (req, res) => {
  const { email, first_name, last_name, username, password } = req.body
  
  const notUnique = await User.findOne({$or: [
    {username: username},
    {email: email}
  ]})

  if(notUnique)
    return res.status(400).json({ error: "Username or email already in use" })

  const hashed_pass = await bcrypt.hash(password, 12)

  try {
    const user = await User.create({ email, first_name, last_name, username, hashed_pass })
    res.status(200).json(user)
  } catch (err) {
    console.log(err.message)
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.hashed_pass))
    return res.status(400).json({ error: "Username or password is incorrect" });

  const access_token = jwt.sign({
    "id": user._id
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30s'
  })
  const refresh = jwt.sign({
    "id": user._id
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })

  return res.status(200).json({ message: access_token });
})

module.exports = router