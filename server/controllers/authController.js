const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
  const { email, first_name, last_name, username, password } = req.body;

  try {
    // Checks if username/email already exists in DB
    const notUnique = await User.findOne({$or: [
      {username: username},
      {email: email}
    ]});

    if(notUnique)
      return res.status(400).json({ error: "Username or email already in use" });

    // Performs hashing 12x, recommended minimum: 10x
    const hashed_pass = await bcrypt.hash(password, 12);

    // Creates a new user in the database
    const user = await User.create({ email, first_name, last_name, username, hashed_pass });
    res.status(200).json({ 
      message: "Approved",
      user: user,
      token: createJWT(user._id)
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Finds the user in the database based on the provided username
    const user = await User.findOne({ username });

    // Checks if the user exists and if the password matches the hashed password
    if (!user || !await bcrypt.compare(password, user.hashed_pass))
      return res.status(400).json({ error: "Username or password is incorrect" });

    return res.status(200).json({ 
      message: "Logged in",
      user: user.first_name,
      token: createJWT(user._id) });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

const createJWT = (id) => {
  // Signs token and adds userID as the payload
  const access_token = jwt.sign({
    "id": id
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1d'
  })
  return access_token
}

module.exports = {
  registerUser,
  loginUser
}