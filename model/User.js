const db = require('../helper/database')

module.exports = class User {
    static fetchUser(email) {
        return db.execute(`SELECT * FROM users WHERE email='${email}';`)
    }
    static insertUser(user) {
        return db.execute(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}','${user.password}');`)
    }
    static findById(id) {
        return db.execute(`SELECT * FROM users WHERE id=${id};`)
    }
}
