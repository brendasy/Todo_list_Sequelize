//express
const express = require('express')
const app = express()
//express-handlebars
const exphbs = require('express-handlebars')
exphbs('hadlebars', exphbs({ defaultLayout: 'main' }))
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



app.get('/', (req, res) => {
  res.send('testtest')
})

app.listen(3000, () => {
  console.log('express is running on port 3000')
})