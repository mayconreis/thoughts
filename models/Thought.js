const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// User
const User = require('./User')

const Thought = db.define('Thought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    createdAt: {
        type: DataTypes.DATE,
        get: function () {
            return this.getDataValue('createdAt')
                .toLocaleString('en-GB', { timeZone: 'America/Sao_Paulo' })
        }
    }
})

Thought.belongsTo(User)
User.hasMany(Thought)

module.exports = Thought