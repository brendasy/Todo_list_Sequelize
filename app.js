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

//Todos and Users models
const db = require('./models')
const Todo = db.Todo
const User = db.User

//express-session
const session = require('express-session')
app.use(session(
  {
    secret: '329834y9eh3',
    resave: false,
    saveUninitialized: true
  }
))

// 使用 Passport - 要在「使用路由器」前面
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

//public
app.use(express.static('public'))

app.use('/todos', require('./routes/todo'))
app.use('/users', require('./routes/user'))
app.use('/', require('./routes/home'))


app.listen(3000, () => {
  console.log('express is running on port 3000')
})