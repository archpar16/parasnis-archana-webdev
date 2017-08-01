var mongoose = require('mongoose');

var projectUserSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},

    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    follows: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"}],
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    },
    bookmarks: [{type: String}],
    favorite_theatre: [{type: String}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "ProjectUser"});

// export the schema
module.exports = projectUserSchema;
