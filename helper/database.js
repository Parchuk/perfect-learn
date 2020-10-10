const mysql = require('mysql2')

const pool = mysql.createPool({
    host: '192.168.64.3',
    user: 'root',
    password: '',
    database: 'e_learn'
  });

module.exports = pool.promise()
