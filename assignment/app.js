var app= require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var connectionString = 'mongodb://localhost/webdev_summer_2017';

if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds143071.mlab.com:43071/heroku_59qfk1zj'; // user yours

}

mongoose.connect(connectionString);

require('../assignment/Services/user.service.server');
require('./Services/website.service.server');
require('./Services/page.service.server');
require('./Services/widget.service.server');
