const express = require('express'),
    app = express(),
    connectToMongo = require('./db'),
    cors = require('cors')

//connecting to mango using db.js file
connectToMongo();
app.use(cors())

//used to convert req.body (json) to js objects
app.use(express.json());

//routes inclusion
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


//starting server
app.listen(5000, () => {
    console.log('Devil Arrived!');
})
