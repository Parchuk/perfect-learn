const Course = require('../model/course');
const data = require('../helper/data');
const path = require('path');
const session = require('express-session');

exports.getHome = (req, res, next) => {
    res.render('index', { data: data, user: session.user });
};
exports.getContact = (req, res, next) => {
    res.render('contact', { data: data, user: session.user });
};
exports.getAbout = (req, res, next) => {
    res.render('about', { data: data, user: session.user });
};
exports.getCourse = (req, res, next) => {

    Course.findAll().then((rows) => {

        if (req.isAuthenticated()) {
            res.render('admin/course', {
                data: data,
                course: rows,
                user: session.user
            });

        } else {
            res.render('course', {
                data: data,
                course: rows,
                user: session.user
            });
        }

    }).catch((error) => {
        console.log(error);
    });
};
exports.getCourseFull = (req, res, next) => {
    const id = req.params.id;
    Course.findAll({
        where: {
            id: id
        }
    }).then((rows) => {
        res.render('coursesDetales', {
            data: data,
            course: rows,
            user: session.user
        });
    }).catch((error) => {
        console.log(error);
    });
};