const path = require('path');
const express = require('express');
const router = express.Router();
const passport = require('passport')
const user = require(`${path.resolve('./')}/controllers/user`)
