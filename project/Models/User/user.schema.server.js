var mongoose = require('mongoose');

var projectUserSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},

    firstName: String,
    lastName: String,
    email: String,
    phone: String,

    role: {type: String, default: 'User', enum: ['User', 'Admin', 'Agent']},

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
        theatreId: String,
        id:    String
    }],
    favorite_theatre: [{
        name: String,
        zip: String,
        id:   String
    }],
    orders: [{
        movieId: String,
        zip: String,
        theatreId: String,
        numOfSeats: String,
        seats: [{type: String}],
        showtime: String
    }],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "ProjectUser"});

// export the schema
module.exports = projectUserSchema;

