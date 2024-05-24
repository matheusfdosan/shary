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

// Adicionando usuário no banco de dados
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
      res.redirect("/edit/" + user._id)
    })
    .catch((err) => {
      res.json({ message: err.message, type: "DANGER" })
    })
})

// Mais configurções de usuário
router.get("/edit/:id", (req, res) => {
  let id = req.params.id
  User.findById(id)
    .then((user) => {
      res.render("edit_account")
    })
    .catch((err) => {
      console.log("Error:" + err)
    })
})

// Login do Usuário
router.get("/signin", (req, res) => {
  res.render("signin")
})

router.post("/login", (req, res) => {
  const { email, password } = req.body
  User.findOne({ email, password })
    .then((user) => {
      if (!user) {
        req.session.message = {
          type: "DANGER",
          message: "Invalid credentials. Please check your email and password.",
        }
        res.redirect("/signin")
      } else {
        if (password == user.password) {
          req.session.user = user
          res.redirect("/edit" + user._id, { user: user })
        } else {
          req.session.message = {
            type: "DANGER",
            message:
              "Invalid credentials. Please check your email and password.",
          }
          res.redirect("/signin")
        }
      }
    })
    .catch((err) => {
      req.session.message = {
        type: "DANGER",
        message:
          "An error occurred while logging in. Please try again later." + err,
      }
      res.redirect("/signin")
    })
})

// Após o login, aparece a homepage do usuário
router.get("/homepage/:id", (req, res) => {
  let id = req.params.id
  User.findById(id)
    .then((user) => {
      if (user == null) {
        res.redirect("/signin", { message: "Try again" })
      } else {
        res.render("homepage", { user: user })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router
