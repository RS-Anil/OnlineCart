const mongoose = require('mongoose');
const ColorSchema = new mongoose({
    ColorId: {
        type: Number,
        trim: true,
        default: 0,
        unique: true
    },
    Color: {
        type: String,
        trim: true,
        unique: true
    }
}, {
        timestamps: true
})

const Color = mongoose.model('Color', ColorSchema)
module.exports = { Color }