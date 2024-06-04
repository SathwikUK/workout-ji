const path = require('path')
const fileURLToPath = require('url')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const UserRoutes = require('./routes/user')
//express app
const app = express()


// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

app.use(express.json())

app.use(cors());

app.use((req, res, next) => {
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    console.log(req.path, req.method)
    next();
  });

app.use('/api/workouts' ,workoutRoutes)
app.use('/api/user' ,UserRoutes)

app.use(express.static(path.join(__dirname ,'/client/build')))
app.get('*',(req ,res) => {
    res.sendFile(path.join(__dirname ,"/client/build/index.html"))
}) 
const encodedPassword = encodeURIComponent('Sath@projects123');
const dbURI = `mongodb+srv://SathwikUK:${encodedPassword}@projects.7zbjzgv.mongodb.net/projects?retryWrites=true&w=majority`;

const PORT=5000
mongoose.connect(dbURI).then(()=>{
    app.listen(PORT ,()=>{
        console.log("connected to db and listening to port 5000")
    })
}).catch((error)=>{
    console.log(error)
})
app.get('/' ,(req ,res) =>{
    res.json({messg:'welcome to app'})
})