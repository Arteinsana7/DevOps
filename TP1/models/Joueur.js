const mongoose = require('mongoose')

const joueurSchema = new mongoose.Schema({
  idEquipe: { type: Number, required: true },
  nom: { type: String, required: true },
  numero: { type: Number, required: true },
  poste: { type: String, required: true }
})

module.exports = mongoose.model('Joueur', joueurSchema)