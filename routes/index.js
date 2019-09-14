const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth'); 
const user = require("../controllers/user");
const category = require("../controllers/categoryMaster")
const childcategory = require("../controllers/childCategoryMaster")

router.get("/login", user.login);
router.post("/api/register",user.saveUser);
router.get("/api/tagmaster/category", category.getCategory);
router.post("/api/tagmaster/category", category.addCategory);
router.get("/api/tagmaster/childcategory", childcategory.getChildCategory);
router.post("/api/tagmaster/childcategory", childcategory.addChildCategory);



//router.use('/', auth);


module.exports = router;