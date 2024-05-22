require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")
const path = require("path")

const app = express()
const PORT = 3000

// Configurando o body-parser para analisar corpos de solicitação POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("view engine", "ejs")
app.set("views", "./views")
app.use("", require("./routes/routes"))

// Database connection
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    "MongoDB URI is not defined. Please set the MONGO_URI environment variable."
  )
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongo database")
  })
  .catch((err) => {
    console.log(err)
  })

// Middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

app.use(
  session({
    secret: "40028922",
    saveUninitialized: true,
    resave: false,
  })
)

app.use((req, res, next) => {
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

// Starting server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})
