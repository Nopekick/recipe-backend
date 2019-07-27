const mongoose = require("mongoose")

mongoose.set('debug', true);
mongoose.Promise = Promise
mongoose.connect("mongodb://vmware:vmwarecool1@ds223653.mlab.com:23653/recipe-app", { useNewUrlParser: true })

module.exports.Food = require('./food')