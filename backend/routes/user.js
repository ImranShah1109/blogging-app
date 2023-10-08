const express = require('express');
const router = express();
const { registerUser } = require('../controllers/user.controllers')

// console.log("registerUser ->",registerUser)

router.post('/register',registerUser);


module.exports = router;