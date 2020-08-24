const mysql = require('mysql2');
const Sequelize = require('sequelize');

// const pool = mysql.createPool({
//   host: '192.168.64.3',
//   user: 'root',
//   password: '',
//   database: 'e_learn'
// });

const sequelize = new Sequelize('e_learn', 'root', '', {
  host: '192.168.64.3',
  dialect: 'mysql'
});

// module.exports = pool.promise();
module.exports = sequelize;