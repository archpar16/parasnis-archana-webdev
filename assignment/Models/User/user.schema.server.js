var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},

    appSource: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"}],
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: "User"});
// export the schema
module.exports = userSchema;

