const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
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


const category = mongoose.model('Category', categorySchema);
module.exports = {category}