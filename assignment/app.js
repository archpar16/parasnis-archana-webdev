var app= require('../express');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_summer_2017');

require('./Services/user.service.server');
require('./Services/website.service.server');
require('./Services/page.service.server');
require('./Services/widget.service.server');
// require('./Directives/wbdv-sortable');
