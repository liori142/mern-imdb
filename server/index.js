
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()
const db = require('./DB')
const PORT = process.env.PORT || 8080
const router = require('./routes/movieRouter')
const path = require('path')



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res)=>{
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

db.on('error',()=>{console.log('error in connection')})

app.listen(PORT,()=>{
  console.log(`server is up on ${PORT}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/movies',router)