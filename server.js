const express = require('express')
const app = express()

app.use(express.json())

const joueursRouter = require('./routes/joueurs')
app.use('/api', joueursRouter)

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000')
})