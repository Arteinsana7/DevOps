const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// REGISTER
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const user = new User({ username, password })
  await user.save()
  res.status(201).json({ message: 'Utilisateur créé' })
})

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' })
  const isValid = await user.comparePassword(password)
  if (!isValid) return res.status(401).json({ message: 'Mot de passe incorrect' })
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
  res.json({ token })
})

module.exports = router