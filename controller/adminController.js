const data = require('../helper/data')
const Course = require('../model/course')
const path = require('path')
const fs = require('fs')
const { join } = require('path')
const session = require('express-session')


exports.getCourse = (req, res, next) => {
    Course.fetchAllCourse().then(([rows, fieldData]) => {
    res.render('admin/course', {
        data: data,
        course: rows,
        user: session.user
    })
    }).catch((error) => {
       console.log(error)
    })
}

exports.deleteCourse = (req, res, next) => {
    const id = req.params.id
    Course.fetchCourseById(id).then(([rows, fieldData]) => {
        fs.unlinkSync(path.join(__dirname, `../static/${rows[0].image}` ))
    })
    Course.deleteCourseById(id).then(([rows, fieldData]) => {
    res.redirect('/admin/course')
    }).catch((error) => {
       console.log(error)
    })
}


exports.fetchUpdateCourse = (req, res, next) => {
    const id = req.params.id
    Course.fetchCourseById(id).then(([rows, fieldData]) => {
    res.render('admin/update', {
        data: data,
        course: rows,
        user: session.user
    })
    }).catch((error) => {
       console.log(error)
    })
}

exports.updateCourse = (req, res, next) => {
    const id = req.params.id
    Course.updateCourseById(id, req.body).then(([rows, fieldData]) => {
        res.redirect('/admin/course')
        }).catch((error) => {
           console.log(error)
        })
}

exports.fetchInsertCourse = (req, res, next) => {
    res.render('admin/insert', {
        data: data,
        user: session.user
    })
}

exports.insertCourse = (req, res, next) => {
    let imagePath = req.file.path.replace(/^static\//, '');
    Course.insertCourse(req.body, imagePath).then(([rows, fieldData]) => {
         res.redirect('/admin/course');
        }).catch((error) => {
           console.log(error)
        })
}
