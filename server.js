var app = require('./express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var projectsession      = require('express-session');
var assignmentsession      = require('express-session');
var projectpassport = require('passport');
var assignmentpassport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(assignmentsession({ secret: "lets have one secret",
    resave: true,
    saveUninitialized: true
}));

app.use(projectsession({ secret: "lets have another secret for project",
    resave: true,
    saveUninitialized: true
}));

app.use(projectpassport.initialize());
app.use(projectpassport.session());

app.use(assignmentpassport.initialize());
app.use(assignmentpassport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require("./project/app.js");
// require("./assignment/app.js");


var port = process.env.PORT || 4000;

app.listen(port);


