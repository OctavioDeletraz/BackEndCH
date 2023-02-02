require('dotenv').config()

const mongoose = require('mongoose')

const dbConnection = mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusteroctavio.nugxlnp.mongodb.net/sessions`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('Conectado a Mongodb'))
    .catch(err => console.log(err))


module.exports = dbConnection