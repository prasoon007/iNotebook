const express = require('express'),
    app = express(),
    connectToMongo = require('./db');

connectToMongo();

app.use(express.json());

//routes inclusion
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


//starting server
app.listen(3000, () => {
    console.log('Devil Arrived!');
})
