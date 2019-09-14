const _ = require('lodash')
var {ChildCategory} = require('../models/ChildCategoryMaster');

module.exports.addChildCategory = async (req, res, result) => {
    try {
        let body = req.body
        let saveCategories = []
        for (let element of body) {
            let payload = _.pick(element, ['ChildCategory_Id', 'ChildCategory','Category', 'SubCategory']);
            payload.ChildCategory = (payload.ChildCategory).toUpperCase()
            let saveResponse = await insertDocument(payload,ChildCategory)
            saveCategories.push(saveResponse)
            }
        res.status(200).json({'success': true, 'error': false, 'message': saveCategories})
    } catch (error) {
        //console.log(error)
        res.status(400).json({'success': false, 'error': error, 'message': "Error occured in Child category controller"})
    }
}
module.exports.getChildCategory = async (req, res, result) => {
    try {
        var ChildCategories = await ChildCategory.find().sort( { ChildCategory: -1 } );
        res.status(200).json({'success': true, 'error': false,"ChildCategories":ChildCategories});
    } catch (error) {
        res.status(400).json({'success': false, 'error': error, 'message': "Error occured in Child category controller"})
    }
}
async function insertDocument(doc, ChildCategory) {
    try {
        let results
        while (1) {
            var cursor = await ChildCategory.find({}, { ChildCategory_Id: 1 }).sort( { ChildCategory_Id: -1 } ).limit(1)
            if(cursor[0] && cursor[0].ChildCategory_Id){
                var seq = cursor[0].ChildCategory_Id + 1
            }else {seq = 100000}
            if (!doc.ChildCategory_Id || doc.ChildCategory_Id == 0) {
                doc.ChildCategory_Id = seq;
                doc = new ChildCategory(doc)
                results =await doc.save()
            } else {
                results = await ChildCategory.updateOne({ "ChildCategory_Id" : doc.ChildCategory_Id },
                { $set: {"ChildCategory" : doc.ChildCategory } },
                { upsert: true })
                if(results.nModified == 1){
                    results.ChildCategory_Id = doc.ChildCategory_Id
                    results.ChildCategory = doc.ChildCategory
                    results.message = "Updated Successfully"
                }
            }
            break;
        }
       return results
    } catch (error) {
        console.log("\nInside INSERT document function\n"+error)
        let key = (error.errmsg.split("index:")[1].split("dup key")[0].split("_1")[0]).trim()
        if(error.code==11000 && key == 'ChildCategory_Id'){
            insertDocument(doc, ChildCategory)
        }
        return ({"Error":error.errmsg || error});
    }
}