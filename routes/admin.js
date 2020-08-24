const express = require("express");
const path = require('path');
const adminController = require('../controller/adminController');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated } = require('../helper/auth');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/course', ensureAuthenticated, adminController.getCourse);
router.get('/course/delete/:id', ensureAuthenticated, adminController.deleteCourse);
router.get('/course/update/:id', ensureAuthenticated, adminController.fetchUpdateCourse);
router.post('/course/update/:id', ensureAuthenticated, upload.single('image'), adminController.updateCourse);
router.get('/course/insert', ensureAuthenticated, adminController.fetchInsertCourse);
router.post('/course/insert', ensureAuthenticated, upload.single('image'), adminController.insertCourse);







module.exports = router;