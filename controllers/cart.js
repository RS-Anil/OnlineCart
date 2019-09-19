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
        //let body = _.pick(req.body, ['Email', 'CartItems', 'Mobile']);
        let body =req.body
        console.log(JSON.stringify(body))
        let itemList = []
        let payload = {}
        payload.Email = body.Email ? body.Email : undefined
        payload.Mobile =  body.Mobile ? body.Mobile : undefined
        payload.CartItems = body.CartItems ? body.CartItems : undefined
        payload.WishList = body.WishList ? body.WishList : undefined

        var CartItems =payload.Email? await Cart.find({"Email":payload.Email }) : await Cart.find({"Mobile":payload.Mobile })
        if(CartItems[0] && payload.CartItems){
            if(payload.Email) {
                result =await Cart.updateOne({"Email": payload.Email},{$push :{CartItems:payload.CartItems} })
            } else {
                result =await Cart.updateOne({"Mobile": payload.Email},{$push :{CartItems:payload.CartItems} })
            }
        } else if(CartItems[0] && payload.WishList) {
            if(payload.Email) {
                result =await Cart.updateOne({"Email": payload.Email},{$push :{WishList:payload.WishList} })
            } else {
                result =await Cart.updateOne({"Mobile": payload.Email},{$push :{WishList:payload.WishList} })
            }
        }else {
            console.log("Payload",payload)
            payload = new Cart(payload)
            result =await payload.save()
            console.log(result);

        }
        res.status(200).json({'success': true, 'error': false,"Carts":result});
    } catch (error) {
        res.status(400).json({'success': false, 'error': true, 'message': error.message})
    }
}

module.exports.removeItem = async (req, res, result) => {
    try {
        //let body = _.pick(req.body, ['Email', 'CartItems', 'Mobile']);
        let body = req.body
        let itemList = []
        let payload = {}
        let result
        payload.Email = req.query.Email ? req.query.Email : undefined
        payload.Mobile = req.query.Mobile ? req.query.Mobile : undefined
        payload.CartItems = req.query.CartItems ? req.query.CartItems : undefined
        payload.WishList = req.query.WishList ? req.query.WishList : undefined
        if (payload.CartItems) {
            if (payload.Email) {
                result = await Cart.updateOne({ "Email": payload.Email }, { $pull: { CartItems: payload.CartItems } })
            } else {
                result = await Cart.updateOne({ "Mobile": payload.Email }, { $pull: { CartItems: payload.CartItems } })
            }
        } else if (payload.WishList) {
            if (payload.Email) {
                result = await Cart.updateOne({ "Email": payload.Email }, { $pull: { WishList: payload.WishList } })
            } else {
                result = await Cart.updateOne({ "Mobile": payload.Email }, { $pull: { WishList: payload.WishList } })
            }
        }

        res.status(200).json({ 'success': true, 'error': false, "Carts": result });
    } catch (error) {
        res.status(400).json({ 'success': false, 'error': true, 'message': "Error occured in update item in cart documnets" })
    }
}