const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');

const keys = require('./config/key');

const users = require('./routes/users')();
const profile = require('./routes/profile')();
const posts = require('./routes/posts')();

// DB Config
const db = keys.mongoURI;

// Connect mongoose

mongoose.connect(db)
        .then(() => console.log("Connect successfully"))
        .catch(err => console.log(err))

const bodyParser = require('body-parser');
// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./utils/passport')(passport);

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(allowCrossDomain);

// Use Route
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || keys.port;
app.listen(port, () => console.log(`Server is running on port ${port}`));