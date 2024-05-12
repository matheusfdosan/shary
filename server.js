const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const session = require("express-session")

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.set("view engine", "ejs")
app.set("views", "./views")
app.use("", require("./routes/routes"))

// Configurando o body-parser para analisar corpos de solicitação POST


// Database connection
const DB_CONNECTION = "mongodb://localhost:27017/social-media"
// "mongodb+srv://matheusfaustinoe20:eOVcRYfvX5O0sqOj@crud-application-cluste.3zbzuhw.mongodb.net/?authMechanism=DEFAULT"

mongoose.connect(DB_CONNECTION)

const db = mongoose.connection

db.on("error", (error) => {
  console.log(error)
})
db.once("open", () => {
  console.log("Connected to mongo database")
})

// Middlewares
app.use(express.urlencoded({ extended: false }))
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
