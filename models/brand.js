const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema({
    BrandId:{
        type:Number,
        trim: true,
        default:0,
        unique:true
    },
    Brand:{
        type:String,
        trim:true,
        unique:true
    }
},{
    timestamps:true
}
)

const Brand = mongoose.model("Brand", BrandSchema);
module.exports = {Brand};