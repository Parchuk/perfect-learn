const LocalStrategy = require('passport-local')
// const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Load User Model
const User = require('../model/User')
const session = require('express-session')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
          // Match User 
          User.fetchUser(email)  
          .then(([rows, fieldData]) => {
              if(!rows.length) {
                  return done(null, false, { message: 'That email is not registered' })
              }

              // Match password
              bcrypt.compare(password, rows[0].password, (err, isMatch) => {
                if(err) throw err

                if(isMatch) {
                    return done(null, rows[0])
                } else {
                    return done(null, false, { message: 'Password incorrect' })
                }
              })
          })
          .catch(err => console.log(err)) 
        })
    )
    passport.serializeUser((user, done) => {
        session.user = user
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        User.findById(id).then(([rows, fieldData]) => {
          done(null, rows[0]);
        })
        .catch(err => console.log(err)) 
      });
}