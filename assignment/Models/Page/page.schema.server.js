var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    password: {type: String, require: true},

    name: String,
    description: String,
    // pages: [
    //     {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"}
    // ],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "Website"});
// export the schema
module.exports = websiteSchema;

