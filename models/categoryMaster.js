const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    Category_Id:{
        type:Number,
        trim:true,
        unique:true
    },
    Category:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
},{
    timestamps:true
});


const Category = mongoose.model('Category', CategorySchema);
module.exports = { Category }