const data = require('../helper/data');
const Course = require('../model/course');
const path = require('path');
const fs = require('fs');
const { join } = require('path');
const session = require('express-session');
const { create } = require('domain');


exports.getCourse = (req, res, next) => {
    Course.findAll().then((rows) => {
        res.render('admin/course', {
            data: data,
            course: rows,
            user: session.user
        });
    }).catch((error) => {
        console.log(error);
    });
};

exports.deleteCourse = (req, res, next) => {
    const id = req.params.id;
    Course.findAll({
        where: {
            id: id
        }
    }).then((res) => {
        fs.unlinkSync(path.join(__dirname, `../static/${rows[0].image}`));
    });
    Course.destroy({
        where: {
            id: id
        }
    }).then((res) => {
        res.redirect('/admin/course');
    }).catch((error) => {
        console.log(error);
    });
};


exports.fetchUpdateCourse = (req, res, next) => {
    const id = req.params.id;
    Course.findAll({
        where: {
            id: id
        }
    }).then(([rows, fieldData]) => {
        res.render('admin/update', {
            data: data,
            course: rows,
            user: session.user
        });
    }).catch((error) => {
        console.log(error);
    });
};

exports.updateCourse = (req, res, next) => {
    const id = req.params.id;
    let imagePath = req.file.path.replace(/^static\//, '');
    console.log(imagePath);
    Course.update({
        title: req.body.title,
        preview: req.body.preview,
        course_program: req.body.course_program,
        image: imagePath,
        description: req.body.description,
        price: req.body.price
    }, {
        where: {
            id: id
        }
    }).then((rows) => {
        res.redirect('/admin/course');
    }).catch((error) => {
        console.log(error);
    });
};

exports.fetchInsertCourse = (req, res, next) => {
    res.render('admin/insert', {
        data: data,
        user: session.user
    });
};

exports.insertCourse = (req, res, next) => {
    let imagePath = req.file.path.replace(/^static\//, '');
    let course = {
        title: req.body.title,
        preview: req.body.preview,
        course_program: req.body.course_program,
        image: imagePath,
        description: req.body.description,
        price: req.body.price
    };
    console.log(course);
    Course.create(course)
        .then((result) => {
            console.log("Add course result => ", result);
            console.log("Course added.");
            res.redirect('/admin/course');
        }).catch((err) => console.log(err));
};
