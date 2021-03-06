const db = require('../helper/database')
const { title } = require('../helper/data')
module.exports = class Course {
    static fetchAllCourse() {
        return db.execute('SELECT *  FROM course ORDER BY id DESC')
    }
    static fetchCourseById(id) {
        return db.execute(`SELECT * FROM course WHERE id=${id}`)
    }
    static deleteCourseById(id) {
        return db.execute(`DELETE FROM course WHERE id=${id}`)
    }
    static updateCourseById(id, data) {
        return db.execute(`UPDATE course SET title='${data.title}', preview='${data.preview}', course_program='${data.course_program}', image='${data.image}', description='${data.description}', price='${data.price}' WHERE id=${id};`)
    }
    static insertCourse(data, imagePath) {
        return db.execute(`INSERT INTO course (title, preview, course_program, image, description, price) VALUES ('${data.title}', '${data.preview}','${data.course_program}','${imagePath}','${data.description}','${data.price}');`)
    }
}

