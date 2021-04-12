const dotenv = require("dotenv")
dotenv.config();
const mongoose = require('mongoose')
const dbConnection = process.env.DB
// 'mongodb://localhost:27017/cinema'
mongoose.connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose.connection