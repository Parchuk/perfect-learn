const { Sequelize } = require('sequelize');
const sequelize = require('../helper/database');
const { title } = require('../helper/data');


const Course = sequelize.define('course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preview: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    course_program: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});

module.exports = Course;
