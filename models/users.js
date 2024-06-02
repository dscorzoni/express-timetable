const db = require('./database');
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// User model
const userModel = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    // Check first if user exists
    const userExist = await userModel.findOne({ where: { username: req.body.username }});
    if (userExist) {
        req.flash('message', {'type': 'error', 'message': 'Nome de usuário indisponível, por favor entre com outro.'});
        return null;
    }
    // If not, add a new user
    const userInstance = await userModel.create({
      username: req.body.username,
      fullName: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 13)
    });
    return userInstance;
}

async function getUser(req) {
    const userInstance = await userModel.findOne({ where: { username: req.body.username }});
    if (userInstance) {
        const isMatch = await bcrypt.compare(req.body.password, userInstance.password);
        return (isMatch ? userInstance : false);
    }
    return false;
}

async function getUserInfo(req) {
    const userInstance = await userModel.findOne({ where: { username: req.user.username }});
    return userInstance;
}

async function deleteUser(req) {
    try {
        const userInstance = await userModel.findOne({ where: { username: req.user.username }});
        const deleteAction = await userInstance.destroy();
        return true;
    }
    catch {
        return false;
    }
}

async function updateUser(req) {
    const userInstance = await userModel.findOne({ where: { username: req.user.username }});
    userInstance.fullName = req.body.name;
    userInstance.email = req.body.email;
    userInstance.password = await bcrypt.hash(req.body.password, 13);
    await userInstance.save();
    return true;
}

// Exporting modules
module.exports = {userModel, addUser, getUser, deleteUser, getUserInfo, updateUser};