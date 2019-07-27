const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
    name: String,
    seasonality_california: [],
    tips: String
})

module.exports = mongoose.model('Food', foodSchema)