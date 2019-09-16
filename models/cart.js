const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    Mobile:{
        type:Number,
        trim:true,
        default:0,
        unique:true
    },
    Email:{
        type:String,
        trim:true,
        unique:true
    },
    CartItems:{
        type:[
            String
        ]
    },
    WishList:{
        type:[
            String
        ]
    }
},{
    timestamps:true
});

const Cart = mongoose.model('Cart',CartSchema);
module.exports = {Cart}