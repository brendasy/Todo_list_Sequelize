const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {

  const { name, email, password, password2 } = req.body

  // 加入錯誤訊息提示
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '兩次密碼輸入不相同' })
  }

  if (errors.length > 0) {

    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }
  else {

    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        errors.push({ message: '這個 Email 已經註冊過了' })
        res.render('register', {
          name,
          email,
          password,
          password2
        })
      } else {
        // User.create({
        //   name: req.body.name,
        //   email: req.body.email,
        //   password: req.body.password,
        // }).then(user => res.redirect('/'))
        //   .catch(err => console.log(err))

        const newUser = new User({  //  如果 email 不存在就直接新增
          name,
          email,
          password,
        })

        // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
        bcrypt.genSalt(10, (err, salt) => {
          // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err

            newUser.password = hash
            newUser
              .save()
              .then(user => {
                res.redirect('/')
              })
              .catch(err => console.log(err))

          })
        })
      }
    })
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  // req.flash('success_msg', "你已成功登出")
  res.redirect('/')
})

module.exports = router