const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
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
    res.status(200).json({ 
      message: "Approved",
      user: user,
      token: createJWT(user._id)
    })
  } catch (err) {
    console.log(err.message)
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.hashed_pass))
    return res.status(400).json({ error: "Username or password is incorrect" });

  return res.status(200).json({ 
    message: "Logged in",
    user: user.first_name,
    token: createJWT(user._id) });
}

const getUserInfo = async (req, res) => {
  res.status(200).json(req.user)
}

const createJWT = (id) => {
  const access_token = jwt.sign({
    "id": id
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })
  return access_token
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo
}