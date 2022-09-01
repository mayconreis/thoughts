const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DATABASE_URL
    // process.env.DB_NAME,
    // process.env.DB_USER,
    // process.env.DB_PASS,
    // {
    //     host: process.env.DB_HOST,
    //     dialect: 'mysql'
    // }
)

sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso!')
    })
    .catch((err) => {
        console.log(`Erro ao se conectar ${err}`)
    })

module.exports = sequelize