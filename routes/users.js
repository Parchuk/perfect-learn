const express = require("express")
const path = require('path')
const loginController = require('../controller/loginController')
const router = express.Router()
const { ensureAuthenticated } = require('../helper/auth')


// Login page
router.get( '/login', loginController.getLogin)

// Register page
router.get( '/register', loginController.getRegister)
router.get( '/welcome', loginController.getWelcome)

// // Register Handle 
router.post('/register', loginController.registerHandle)

// // Login Handle 
router.post('/login', loginController.loginHandle)

// // Logout Handle
router.get('/logout', loginController.logoutHandle)


module.exports = router