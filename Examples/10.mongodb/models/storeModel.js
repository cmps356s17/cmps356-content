let mongoose = require('mongoose');

let storeSchema = new mongoose.Schema({
    name: String,
    city: String
});

let Store = mongoose.model('Store', storeSchema)
module.exports= Store;