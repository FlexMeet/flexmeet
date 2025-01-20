const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test } = require('../controllers/authController');

router.use(
    cors({
    origin: 'http://localhost:3000',
    credentials: true
    })
);

router.get('/', test);

module.exports = router;