const _ = require('lodash');
var {Brand} = require('../models/brand');

module.exports.addBrand = async (req, res, result) => {
    try {
        let body = req.body
        let saveBrands = [];
        for ( let element of body){
            let payload = _.pick(element,["Brand_Id","Brand"]);
            payload.Brand = (payload.Brand).toUpperCase();
            let saveResponse = await insertDocument(payload, Brand);
            saveBrands.push(saveResponse);
        }
        res.status(200).json({'success': true, 'error': false, 'message': saveBrands})
    } catch (error) {
        res.status(400).json({'success': false, 'error': error, 'message': saveBrands})
    }
}

module.exports.getBrand = async (req, res, result) => {
    try {
        var  Brands = await Brand.find().sort({ Brand : -1})
        res.status(200).json({'success':true, 'error':false, 'Brands': Brands});        
    } catch (error) {
        res.status(200).json({'success':true, 'error':false, 'message': "Invalid Credentials"});
    }
}


async function insertDocument(doc, Brand) {
    try {
        let results
        while (1) {
            var cursor = await Brand.find({}, { Brand_Id: 1 }).sort( { Brand_Id: -1 } ).limit(1)
            if(cursor[0] && cursor[0].Brand_Id){
                var seq = cursor[0].Brand_Id + 1
            }else {seq = 100000}
            if (!doc.Brand_Id || doc.Brand_Id == 0) {
                doc.Brand_Id = seq;
                doc = new Brand(doc)
                results =await doc.save()
            } else {
                results = await Brand.updateOne({ "Brand_Id" : doc.Brand_Id },
                { $set: {"Brand" : doc.Brand } },
                { upsert: true })
                if(results.nModified == 1){
                    results.Brand_Id = doc.Brand_Id
                    results.Brand = doc.Brand
                    results.message = "Updated Successfully"
                }
            }
            break;
        }
       return results
    } catch (error) {
        let key = (error.errmsg.split("index:")[1].split("dup key")[0].split("_1")[0]).trim()
        if(error.code==11000 && key == 'Brand_Id'){
            insertDocument(doc, Brand)
        }
        return ({"Error":error.errmsg});
    }
}