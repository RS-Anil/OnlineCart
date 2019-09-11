const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth'); 

const user = require("../controllers/user")

router.get("/login", user.login);
router.post("/api/register",user.saveUser)

//router.use('/', auth);


module.exports = router;