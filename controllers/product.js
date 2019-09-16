const _ = require('lodash')
const {Product} = require('../models/product');

module.exports.addProduct = async (req, res, result) => {
    try {
        let body = req.body
        let saveProducts = []
        for (let element of body) {
            let payload = element
            payload.Product_Name = (payload.Product_Name).toUpperCase()
            let saveResponse = await insertDocument(payload,Product)
            saveProducts.push(saveResponse)
        }
        res.status(200).json({'success': true, 'error': false, 'message': saveProducts})
    } catch (error) {
        res.status(400).json({'success': false, 'error': error, 'message': "Error Occured while saving Item"})
    }
}
async function insertDocument(doc, Product) {
    try {
        let results
        while (1) {
            var cursor = await Product.find({}, { Product_Id: 1 }).sort( { Product_Id: -1 } ).limit(1)
            if(cursor[0] && cursor[0].Product_Id){
                var seq = cursor[0].Product_Id + 1
            }else {seq = 100000}

            if (!doc.Product_Id || doc.Product_Id == 0) {
                doc.Product_Id = seq;
                doc = new Product(doc)
                results =await doc.save()

            } else {
                results = await Product.updateOne({ "Product_Id" : doc.Product_Id },
                { $set: {doc} },
                { upsert: true })
                if(results.nModified == 1){
                    results.Product_Id = doc.Product_Id
                    results.Product = doc.Product
                    results.message = "Updated Successfully"
                }
            }
            break;
        }
       return results
    } catch (error) {
        console.log(error)
        let key = (error.errmsg.split("index:")[1].split("dup key")[0].split("_1")[0]).trim()
        if(error.code==11000 && key == 'Product_Id'){
            insertDocument(doc, Product)
        }
        return ({"Error":error.errmsg});
    }
}

// Get Product
module.exports.getProduct = async (req, res, result) => {
    try {
        var Products = await Product.find().sort( { Product: -1 } );
        res.status(200).json({'success': true, 'error': false,"Products":Products});
    } catch (error) {
        res.status(400).json({'success': false, 'error': true, 'message': "Invalid Credential"})
    }
}