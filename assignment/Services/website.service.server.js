var app = require('../../express');
var websiteModel = require('../Models/Website/website.model.server');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);


function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    console.log('create new website ' + website);
    websiteModel
        .createWebsite(userId, website)
        .then(function (website) {
            res.send(website);
        });
}


function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    console.log(website);

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (website) {
            res.send(website);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .deleteWebsite(websiteId)
        .then(function (website) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findWebsitesByUser(req, res) {
    var userId = req.params.userId;
    websiteModel
        .findWebsitesByUser(userId)
        .then(function (websites) {
            res.send(websites);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.send(website);
        });
}


