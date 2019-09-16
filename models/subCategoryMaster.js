const mongoose = require('mongoose');
const SubCategorySchema = new mongoose.Schema({
    SubCategory_Id: {
        type: Number,
        trim: true
    },
    SubCategory: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    Category: [{
        Category_Id: { type: Number, trim: true, required: true },
        Category:{type:String, trim:true, required:true}
        }
    ]
},{
    timestamps: true
})

const SubCategory = mongoose.model('SubCategory', SubCategorySchema)
module.exports = {SubCategory}