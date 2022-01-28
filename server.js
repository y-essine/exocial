const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const RateLimit = require('express-rate-limit');

dotenv.config();

const { PORT, mongoUri } = require('./config');

const authRoute = require('./routes/api/auth')
const usersRoute = require('./routes/api/users')
const postsRoute = require('./routes/api/posts')

// set up rate limiter: maximum of five requests per minute
const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30
});


app
    .use(cors())
    .use(morgan('tiny'))
    .use(bodyParser.json())
    .use(limiter)
    .use(helmet())

//csp
app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy', "script-src 'self'; img-src 'self' https://i.imgur.com https://w7.pngwing.com/; frame-src 'self'"
      );
    next();
});


mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connection to MongoDB is successful.');
    })
    .catch((err) => console.log(err));

//api
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

//get front
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    })
}

app.listen(PORT, () => console.log((`App listening at http://localhost:${PORT}`)));

