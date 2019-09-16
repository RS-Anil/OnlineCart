const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    Product_Id:{
        type:Number,
        default:0
    },
    Product_Name:{
        type:String,
        required:true
    },
    SKU:{
        type:String,
        unique:true,
        required:true
    },
    Category_Id:{
        type:Number,
        trim:true,
        required:true
    },
    Category:{
        type:String,
        trim:true,
        required:true
    },
    SubCategory_Id: {
        type: Number,
        "trim": true,
    },
    SubCategory: {
        type: String,
        trim: true,
    },
    ChildCategory_Id: {
        type: Number,
        "trim": true,
    },
    ChildCategory: {
        type: String,
        trim: true,
    },
    Brand_Id: {
        type: Number,
        "trim": true,
    },
    Brand: {
        type: String,
        trim: true,
    },
    Size_Id: {
        type: Number,
        "trim": true,
    },
    Size: {
        type: String,
        trim: true,
    },
    Color_Id: {
        type: Number,
        "trim": true,
    },
    Color: {
        type: String,
        trim: true,
    },
    Price:{
        type:String,
        required:true,
    },
    SalePrice:{
        type:String,
        default:null
    },
    MainImage:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    Images: {
		type: [
			String
		]
	}
},{
    timestamps:true
})
const Product = mongoose.model('Product', ProductSchema)
module.exports = {Product}