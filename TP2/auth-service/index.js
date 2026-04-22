const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4002;
const mongoose = require("mongoose");
const Utilisateur = require("./Utilisateur");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

app.use(express.json());

mongoose.connect("mongodb://db:27017/auth-service")
  .then(() => console.log(`Auth-Service DB Connected`))
  .catch(err => console.error(err));

// REGISTER
app.post("/auth/register", async (req, res) => {
  let { nom, email, mot_passe } = req.body;
  const userExists = await Utilisateur.findOne({ email });
  if (userExists) {
    return res.json({ message: "Cet utilisateur existe déjà" });
  }
  bcrypt.hash(mot_passe, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });
    mot_passe = hash;
    const newUtilisateur = new Utilisateur({ nom, email, mot_passe });
    newUtilisateur.save()
      .then(user => res.status(201).json(user))
      .catch(error => res.status(400).json({ error }));
  });
});

// LOGIN
app.post("/auth/login", async (req, res) => {
  const { email, mot_passe } = req.body;
  const utilisateur = await Utilisateur.findOne({ email });
  if (!utilisateur) {
    return res.json({ message: "Utilisateur introuvable" });
  }
  bcrypt.compare(mot_passe, utilisateur.mot_passe).then(resultat => {
    if (!resultat) {
      return res.json({ message: "Mot de passe incorrect" });
    }
    const payload = { email, nom: utilisateur.nom };
    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else return res.json({ token });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Auth-Service at ${PORT}`);
});
