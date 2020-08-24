const express = require("express")
const path = require('path')
const learnController = require('../controller/learnController')

const router = express.Router()

router.get('/', learnController.getHome)
router.get('/contact', learnController.getContact)
router.get('/about', learnController.getAbout)
router.get('/course', learnController.getCourse)
router.get('/course/:id', learnController.getCourseFull)



module.exports = router