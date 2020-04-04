const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')


module.exports = passport => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },  //因為預設的名稱為username,所以必須加上這個物件
      (email, password, done) => {
        User.findOne({ where: { email: email } })
          .then(user => {
            if (!user) {
              return done(null, false, { message: 'This email is not registered!' })
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err
              if (!isMatch) {
                return done(null, false, { message: 'Password is incorrect!' })
              }
              else {
                return done(null, user)
              }
            })
            // if (user.password !== password) {
            //   return done(null, false, { message: 'Password is incorrect!' })
            // }
            // return done(null, user)
          })
      }
    )
  )

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,
      profileFields: ['displayName', 'email']
    },
      (accessToken, refreshToken, profile, done) => {

        User.findOne({ where: { email: profile._json.email } })
          .then(user => {
            if (!user) {
              // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
              var randomPassword = Math.random().toString(36).slice(-8)
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(randomPassword, salt, (err, hash) => {
                  var newUser = new User({
                    email: profile._json.email,
                    name: profile._json.name,
                    password: hash
                  })
                  newUser.save().then(user => {
                    return done(null, user)
                  }).catch(err => {
                    console.err(err)
                  })
                })
              })

            }
            else {
              return done(null, user)
            }
          })


        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //   return done(err, user)
        // })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {

        user = user.get()

        done(null, user)
      })
  })

}
