const express = require("express")
const User = require("../models/users.js")
const session = require("express-session")
const mongoose = require("mongoose")
const router = express.Router()

router.use(
  session({
    secret: "40028922",
    resave: false,
    saveUninitialized: true,
  })
)

router.get("/", (req, res) => {
  res.render("index")
})

// Cadastro do Usuário
router.get("/signup", (req, res) => {
  res.render("signup")
})

router.post("/add", (req, res) => {
  const user = new User({
    username: req.body.username,
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

// Login do Usuário
router.get("/signin", (req, res) => {
  res.render("signin")
})

router.post("/login", (req, res) => {
  res.redirect("/")
})

module.exports = router
