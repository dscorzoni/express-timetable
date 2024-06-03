const db = require('./database');
const { Sequelize, DataTypes } = require('sequelize');
const { userModel } = require('./users');

// Time model
const timeModel = db.define('Time', {
    starttime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endtime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

userModel.hasMany(timeModel);

// Time Data Operations
async function addTime(req) {
    const userInstance = await userModel.findOne({ where: { username: req.user.username }});
    const timeInstance = await timeModel.create({
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        UserId: userInstance.id
    });
    return timeInstance;
}

async function getTimeList(req) {
    const userInstance = await userModel.findOne({ where: { username: req.user.username }});
    const timeInstance = await timeModel.findAll({ where: { UserId: userInstance.id }});
    return timeInstance;
}

module.exports = { addTime, getTimeList };