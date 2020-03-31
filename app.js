//express
const express = require('express')
const app = express()
//express-handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
//method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
//express-session
const session = require('express-session')
app.use(session(
  {
    secret: '329834y9eh3',
    resave: false,
    saveUninitialized: true
  }
))
//passport
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

//public
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/todos', (req, res) => {
  res.render('index')
})

app.get('/todos/:id', (req, res) => {

})

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  res.render('index')
})

app.get('/todos/:id/edit', (req, res) => {

})

app.put('/todos/:id', (req, res) => {

})

app.delete('/todos/:id', (req, res) => {
  res.render('index')
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {

})

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/regester', (req, res) => {

})

app.listen(3000, () => {
  console.log('express is running on port 3000')
})