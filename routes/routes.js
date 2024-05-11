const express = require("express")
const User = require("../models/users.js")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("index")
})

// Cadastro do Usuário
router.get("/signup", (req, res) => {
  res.render("signup")
})

router.post("/add", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  user
    .save()
    .then((user) => {
      req.session.message = {
        type: "SUCESS",
        message: "Usuário Adicionado com Sucesso!",
      }
      console.log("Usuário Salvo: " + user)
      res.redirect("/")
    })
    .catch((err) => {
      res.json({ message: err.message, type: "DANGER" })
    })
})

module.exports = router
