var { Cart } = require('../models/cart');
var { Product } = require('../models/product')


module.exports.getItem = async (req, res, result) => {
    try {
        let flag = req.query.flag ? req.query.flag : 'CartItems';
        let products;
        let result = req.query.Email ? await Cart.findOne({ "Email": req.query.Email }) : await Cart.findOne({ "Mobile": req.query.Mobile });
        if (flag = 'CartItems') {
            products = await Product.find({ Product_Id: result.CartItems })
        } else {
            products = await Product.find({ Product_Id: result.WishList })

        }
        res.status(200).json({ 'success': true, 'error': false, "Products": products });
    } catch (error) {
        res.status(400).json({ 'success': false, 'error': true, 'message': "No Item found" })
    }
}

module.exports.saveItem = async (req, res, result) => {
    try {
        let body = req.body;
        let payload = {};
        payload.Email = body.Email ? body.Email : undefined
        payload.Mobile =  body.Mobile ? body.Mobile : undefined
        payload.CartItems = body.CartItems ? body.CartItems : undefined
        payload.WishList = body.WishList ? body.WishList : undefined

        var CartItems =payload.Email? await Cart.find({"Email":payload.Email }) : await Cart.find({"Mobile":payload.Mobile })
        
    } catch (error) {
        
    }
}