const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./config/db');
const config = require('config');
const port = config.get('port');
const passport = require("passport");
const initIl8n = require('./config/il8n');

require('./config/authentication')();

connectDB();

app.use(express.json({extended: false}));
app.use(cors());
app.use(initIl8n());
app.use(passport.initialize());
app.use('/', require('./routes/user'));

app.listen(port, (error) => {
    if (error) {
        console.error('Error while starting server: ', error)
    } else {
        console.log(`Server started on PORT ${port}`)
    }
});
