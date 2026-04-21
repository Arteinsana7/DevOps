const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4001;
const mongoose = require("mongoose");
const Commande = require("./Commande");
const axios = require('axios');
const isAuthenticated = require('./isAuthenticated') // Middleware

app.use(express.json());

mongoose.connect("mongodb://localhost/commande-service")
  .then(() => console.log(`Commande-Service DB Connected`))
  .catch(err => console.error(err));

// Calcul TOTAL PRICE
function prixTotal(produits) {
  let total = 0;
  for (let t = 0; t < produits.length; ++t) {
    total += produits[t].prix;
  }
  return total;
}

//CALL HTTP to service produit
async function httpRequest(ids) {
  try {
    const URL = "http://localhost:4000/produit/acheter"
    const response = await axios.get(URL, {
      data: { ids: ids },
      headers: { 'Content-Type': 'application/json' }
    });
    return prixTotal(response.data);
  } catch (error) {
    console.error(error);
  }
}

// POST ajouter une commande
app.post("/commande/ajouter", isAuthenticated, async (req, res, next) => {
    const { ids } = req.body
    const total = await httpRequest(ids);
    const newCommande = new Commande({
      produits: ids,
      email_utilisateur: req.user.email,  // depuis le token !
      prix_total: total,
    });
    newCommande.save()
      .then(commande => res.status(201).json(commande))
      .catch(error => res.status(400).json({ error }));
  });
  
  app.listen(PORT, () => {
    console.log(`Commande-Service at ${PORT}`);
  });