var app = require('./express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(session({ secret: "lets have one secret",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require("./assignment/app.js");
require("./project/app.js");

var port = process.env.PORT || 3000;

app.listen(port);


