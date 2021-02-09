const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const Post = require('./models/Post');

const app =  express();
const port = process.env.PORT || 5000;


//MiddleWares
app.use(cors());
app.use(express.urlencoded({
    extend: true
}));
app.use(express.static('dist'));
app.use(bodyParser.json({extend:true}));

// Routes
const postRoute = require('./routes/posts');
app.use('/memes', postRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('Connected to DB'),
);

app.listen(port, () => console.log(`Server Running on port ${port}`));

