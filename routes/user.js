const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body
  User.findOne({ where: { email: email } }).then(user => {
    if (user) {
      console.log('User already exists')
      res.render('register', {
        name,
        email,
        password,
        password2
      })
    } else {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.redirect('/'))
        .catch(err => console.log(err))

      /*
      const newUser = new User({  //  如果 email 不存在就直接新增
        name,
        email,
        password,
      })
      newUser
      .save()
      .then(user => {
        res.redirect('/')                   // 新增完成導回首頁
      })
      .catch(err => console.log(err))
      */
    }
  })

})

router.get('/logout', (req, res) => {
  res.redirect('/')
})

module.exports = router