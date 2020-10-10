const express = require('express');
const path = require('path');

// const expressLayouts = require('express-ejs-layouts')

// const mongoose = require('mongoose')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const PORT = 3000;
const app = express();

//Database 
const db = require('./helper/database');

// Passport config
require('./helper/passport')(passport);

// Controllers
const errorController = require('./controller/errorController');
// const adminController = require('./controller/adminController')


// Middleware
app.set('view engine', 'ejs');
app.set('wiews', 'wiews');
// Bodyparser
app.use(express.urlencoded({ extends: false }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // cookie: {
  //   maxAge: 100000,
  //   httpOnly: false,
  // },
}));

// Passport middleware 
app.use(passport.initialize());
app.use(passport.session());

// Connect Flesh
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');

  next();
});

// app.use(express.static(path.join(__dirname, 'static')))
app.use(['/admin/course/update', '/admin/course/insert', '/course', '/users', '/admin', '/'], express.static(path.join(__dirname, 'static')));
// app.use('/admin/course/update', express.static(path.join(__dirname, 'static'))) 

// Routes middleware
const learnRoutes = require('./routes/learn');
const adminRoutes = require('./routes/admin');

// app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));
app.use(learnRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.get404);
// app.use(adminController.getCourse)








app.listen(PORT, () => console.log(`Server running at port ${PORT}`));