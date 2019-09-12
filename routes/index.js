const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth'); 
const user = require("../controllers/user");
const category = require("../controllers/categoryMaster")

router.get("/login", user.login);
router.post("/api/register",user.saveUser);
router.post("/tagmaster/category", category.addCategory);


//router.use('/', auth);


module.exports = router;