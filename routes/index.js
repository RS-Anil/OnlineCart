const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth'); 
const user = require("../controllers/user");
const category = require("../controllers/categoryMaster")
const childcategory = require("../controllers/childCategoryMaster")
const brand = require("../controllers/brand")

router.get("/login", user.login);
router.post("/api/register",user.saveUser);
router.get("/api/tagmaster/category", category.getCategory);
router.post("/api/tagmaster/category", category.addCategory);
router.get('/api/tagmaster/subcategory', subCategory.getSubCategory)
router.post('/api/tagmaster/subcategory', subCategory.addSubCategory)
router.get("/api/tagmaster/childcategory", childcategory.getChildCategory);
router.post("/api/tagmaster/childcategory", childcategory.addChildCategory);
router.get("/api/tagmaster/brand", brand.getBrand);
router.post("/api/tagmaster/brand", brand.addBrand);



//router.use('/', auth);


module.exports = router;