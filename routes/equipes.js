const express = require('express')
const router = express.Router()
const Equipe = require('../models/Equipe')
const auth = require('../middlewares/auth')

// GET All Teams //

router.get('/equipes', async (req, res) => {
    const equipes = await Equipe.find()
    res.json(equipes)
})

// GET one Team by Id //
router.get('/equipes/:id', async (req, res) => {
    const equipe = await Equipe.findById(req.params.id)
    if (!equipe) return res.status(400).json({message : 'Equipe non trouvée'})
        res.json(equipe)
})

// POST CREATE a Team //
router.post('/equipes', auth, async (req, res)=>{
    const equipe = new Equipe (req.body)
    await equipe.save()
    res.status(201).json(equipe)
})

// PUT Modigy a Team //
router.put('/equipes/:id', auth, async (req, res) => {
    const equipe = await Equipe.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if (!equipe) return res.status(404).json({message: 'Equipe non trouvé'})
        res.json(equipe)
})


// DELETE a Team //
router.delete('/equipes', auth, async ( req, res) => {
    const equipe = await Equipe.findByIdAndDelete(req.params.id)
    if(!equipe) return res.status(400).json({message: 'Equipe non trouvé'})
        res.json({message: 'Equipe supprimé', equipe})
})

module.exports = router