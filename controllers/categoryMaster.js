const _ = require('lodash');
var { Category } = require('../models/categoryMaster');


module.exports.addCategory = async (req, res, result) => {
    try {
        let body = req.body;
        var saveCategories = [];
        for (let element of body) {
            let payload = _.pick(element, ['Category_Id', 'Category']);
            console.log(payload)

            payload.Category = (payload.Category).toUpperCase();
            let saveResponse = await insertDocument(payload, Category)
            saveCategories.push(saveResponse);
        }
        res.status(200).json({ 'succes': true, 'error': false, 'message': saveCategories })
    } catch (error) {
        res.status(200).json({ 'succes': false, 'error': true, 'message': saveCategories })
    }
}

async function insertDocument(doc, Category) {
    try {
        console.log("Doc", doc)
        let result
        while (1) {
            var cursor = await Category.find({}, { Category_Id: 1 }).sort({ Category_Id: -1 }).limit(1)
            if (cursor[0] && cursor[0].Category_Id) {
                var seq = cursor[0].Category_Id + 1;
                console.log("seq if")
            } else {
                seq = 10000
                console.log("seq else")

            }
            if (!doc.Category_Id || doc.Category_Id == 0) {
                doc.Category_Id = seq;
                doc = new Category(doc);
                result = await doc.save();
                console.log(result)
            } else {
                result = await Category.updateOne({ "Category_Id": doc.Category_Id },
                    { $set: { "Category": doc.Category_Id } },
                    { upset: true })
                if (result.nModified == 1) {
                    results.Category_Id = doc.Category_Id
                    results.Category = doc.Category
                    results.message = "Updated Successfully"
                }
            }
            break;
        }
        return result
    } catch (error) {
        let key = (error.errmsg.split("index:")[1].split("dup key")[0].split("_1")[0]).trim()
        if (error.code == 11000 && key == 'Category_Id') {
            insertDocument(doc, Category)
        }
        return ({ "Error": error.errmsg });
    }
}