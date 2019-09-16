const mongoose = require('mongoose');
const ChildCategorySchema = new mongoose.Schema({
    ChildCategory_Id:{
        type:Number,
        trim:true
    },
    ChildCategory:{
       type:String,
       trim:true,
       required:true,
       unique:true
    },
    Category:[{
        Category_Id:{type:Number, trim:true, required:true},
        Category:{type:String, trim:true, required:true}
    }],
    SubCategory: [{
        SubCategory_Id:{ type: Number, trim:true, required:true},
        SubCategory:{ type: String, trim:true, required: true}
    }]
},{
    timestamps:true
})

const ChildCategory = mongoose.model('ChildCategory', ChildCategorySchema);
module.exports = {ChildCategory}