var mongoose = require('mongoose');

var projectUserSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},

    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    // follows: [{
    //     type: mongoose.Schema.Types.ObjectId, ref:"ProjectUserModel"
    // }],
    follows: [{
        type: String
    }],
    following: [{
        type: String
    }],
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    },
    bookmarks: [{
        title: String,
        zip: String,
        id:    String
    }],
    favorite_theatre: [{
        name: String,
        zip: String,
        id:   String
    }],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "ProjectUser"});

// export the schema
module.exports = projectUserSchema;

