const _ = require('lodash');
var { SubCategory } = require(' ../models/subCategoryMaster');

module.exports.addSubCategory = async (req, res, result) => {
    try {
        let body = req.body
        let saveCategories = []
        for (let element of body) {
            let payload = _.pick(element, ['SubCategory_Id', 'SubCategory', 'Category_Id', 'Category']);
            payload.SubCategory = (payload.SubCategory).toUpperCase()
            let saveResponse = await insertDocument(payload, SubCategory)
            saveCategories.push(saveResponse)
        }
        res.status(200).json({ 'success': true, 'error': false, 'message': saveCategories })
    } catch (error) {
        res.status(400).json({ 'success': false, 'error': error, 'message': "Error occured in Sub category controller" })
    }
}
module.exports.getSubCategory = async (req, res, result) => {
    try {
        var SubCategories = await SubCategory.find().sort({ SubCategory: -1 });
        res.status(200).json({ 'success': true, 'error': false, "SubCategories": SubCategories });
    } catch (error) {
        res.status(400).json({ 'success': false, 'error': error, 'message': "Error occured in Sub category controller" })
    }
}

async function insertDocument(doc, SubCategory) {
    let result;
    try {
        while (1) {
            var cursor = await SubCategory.find({}, { SubCategory_Id: 1 }).sort({ SubCategory_Id: -1 }).limit(1);
            if (cursor[0] && cursor[0].SubCategory_Id) {
                var seq = cursor[0].SubCategory_Id + 1
            } else { seq = 100000 };
            if (!doc.SubCategory_Id || doc.SubCategory_Id == 0) {
                doc.SubCategory_Id = seq;
                doc = new SubCategory(doc);
                result = await doc.save();
            } else {
                result = await SubCategory.updateOne({ "SubCategory_Id": doc.SubCategory_Id },
                    { $set: { "SubCategory": doc.SubCategory } },
                    { upsert: true })
                if (results.nModified == 1) {
                    results.SubCategory_Id = doc.SubCategory_Id
                    results.SubCategory = doc.SubCategory
                    results.message = "Updated Successfully"
                }
            }
            break;
        }
        return results;
    } catch (error) {
        let key = (error.errmsg.split("index:")[1].split("dup key")[0].split("_1")[0]).trim()
        if (error.code == 11000 && key == 'SubCategory_Id') {
            insertDocument(doc, SubCategory)
        }
        return ({ "Error": error.errmsg });
    }
}