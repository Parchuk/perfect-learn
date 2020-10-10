const data = require('../helper/data')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const session = require('express-session')


exports.getLogin = (req, res, next) => {
    res.render('login/login', {
        data: data,
        user: session.user
    })
}

exports.getRegister = (req, res, next) => {
    res.render('login/register',{
        data: data,
        user: session.user
    })
}

exports.getWelcome = (req, res, next) => {

    if(req.isAuthenticated()){
        res.render('login/dashboard', {
            data: data,
            user: session.user
        })
    } else {
        res.render('login/welcome', {
            data: data,
            user: session.user
        })
    }
}

exports.registerHandle = (req, res, next) => {
    const {name, email, password, password2} = req.body
    let errors = []

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }

    // Check passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    //  Check pass length
    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be at least 6 characters' })
    }

    if(errors.length > 0) {
        res.render('login/register', {
            errors,
            name,
            email,
            password,
            password2,
            data
        })
    } else {
        // Validation passed   
        User.fetchUser(email)
        .then(([rows, fieldData]) => {
            console.log(rows.length == false)

            if (rows.length) {
               // User exists
               errors .push({ msg: 'Email is already registered' })
               res.render('login/register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    data
                })
            } else {
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) throw err
                        // Set password to  heshed
                        req.body.password = hash

                        // Save user
                        User.insertUser(req.body)
                        
                        .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in')
                            res.redirect('/users/login')
                        })
                        .catch(err => console.log(err))
                }))
            }
        })
        .catch()
    }
}

exports.loginHandle = (req, res, next) => {
        passport.authenticate('local', { 
        successRedirect: '/admin/course',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next)
}

// exports.dashboardHandle = (req, res, next) => {
//     passport.authenticate('local', { 
//     successRedirect: '/users/dashboard',
//     failureRedirect: '/users/welcome',
//     failureFlash: true
// })(req, res, next)
// }
 
exports.logoutHandle = (req, res, next) => {
    session.user = { name: 'login'}
    req.logOut()
    req.flash('success_msg', 'You are logged out')
    res.redirect('/users/login')
}

