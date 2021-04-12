require('dotenv').config()
const mongoose = require('mongoose')
const dbConnection = process.env.DB
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose.connection