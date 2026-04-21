require('dotenv').config()
const express = require('express')
const { connectDB } = require('./config/database')

const app = express()
app.use(express.json())

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

const joueursRouter = require('./routes/joueurs')
app.use('/api', joueursRouter)

const equipeRouter = require('./routes/equipes')
app.use('/api', equipeRouter)

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('❌ Erreur:', err)
    process.exit(1)
  }
}

startServer()