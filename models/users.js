const db = require('./database');
const { Sequelize, DataTypes } = require('sequelize');

// User model
const userModel = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// User CRUD functions
async function addUser(req) {
    const userInstance = await userModel.create({
      username: req.body.username,
      fullName: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    return userInstance;
  }


// Exporting modules
module.exports = {userModel, addUser};