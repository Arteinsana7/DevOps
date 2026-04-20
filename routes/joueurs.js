const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/joueurs.JSON')
function getJoueurs() {
    const data = fs.readFileSync(DB_PATH, 'utf-8')
    return JSON.parse(data)
}
// METHODE TO GET ALL PALYERS //
router.get('/joueurs', (req, res) => {
    res.json(getJoueurs())
})


// METHODE TO GET ALL PLAYERS EACH ONE BY ID //
router.get('/joueurs/:id', (req, res) => {
    const joueurs = getJoueurs()
    const joueur = joueurs.find(joueur => joueur.id === parseInt(req.params.id))
    if (!joueur) return res.status(404).json({message: 'joueur non trouvé'})
        res.json(joueur)
})

// METHODE TO POST ONE PLAYER //
router.post('/joueurs', (req,res) => {
    const joueurs = getJoueurs()
    const  {idEquipe, nom, numero, poste} = req.body
    const newId = joueurs.length > 0 ? Math.max(...joueurs.map(j => j.id)) + 1 : 1
    const newJoueur = {id: newId, idEquipe, nom, numero, poste}
    joueurs.push(newJoueur)
    fs.writeFileSync(DB_PATH, JSON.stringify(joueurs, null, 2))
    res.status(201).json(newJoueur)
})

// METHODE TO CHANGE THE IDs OF EACH PLAYER
router.put('/joueurs/:id', (req, res) => {
    const joueurs = getJoueurs()
    const index = joueurs.findIndex(j => j.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({message : 'joueur non trouvé'})
        joueurs[index] = {...joueurs[index], ...req.body}
    fs.writeFileSync(DB_PATH, JSON.stringify(joueurs, null, 2))
    res.json(joueurs[index])
})

router.delete('/joueurs/:id', (req, res) => {
    const joueurs = getJoueurs()
    const index = joueurs.findIndex(j => j.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ message: 'Joueur non trouvé' })
    const supprime = joueurs.splice(index, 1)
    fs.writeFileSync(DB_PATH, JSON.stringify(joueurs, null, 2))
    res.json({ message: 'Joueur supprimé', joueur: supprime[0] })
  })


module.exports = router; 
