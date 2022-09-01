const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize({
    connectioString: process.env.DATABASE_URL
})


sequelize.authenticate()
    .then(() => {
        console.log('Conectado com sucesso!')
    })
    .catch((err) => {
        console.log(`Erro ao se conectar ${err}`)
    })

module.exports = sequelize