var app = require('../../express');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findWebsitesByUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);


var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];


function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.send(website);
}


function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    console.log(website);
    var oldWebsite = findWebsiteByIdInternal(websiteId);
    var index = websites.indexOf(oldWebsite);
    // var oldWebsite = findWebsiteByIdInternal(websiteId);
    // var index = websites.indexOf(oldWebsite);
    websites.splice(index, 1);
    //deleteWebsiteInternal(websiteId);
    // Add the new website
    websites.splice(index, 0, website);

    res.send(website);
}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    deleteWebsiteInternal(websiteId);
    res.sendStatus(200);
}

function deleteWebsiteInternal(websiteId) {
    var website = findWebsiteByIdInternal(websiteId);
    var index = websites.indexOf(website);
    websites.splice(index, 1);
}

function findWebsitesByUser(req, res) {
    var userId = req.params.userId;
    var result = [];

    for (var w in websites){
        if(websites[w].developerId === userId) {
            result.push(websites[w]);
        }
    }
    res.send(result);
}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    var website = findWebsiteByIdInternal(websiteId);
    res.send(website);
}


function findWebsiteByIdInternal(websiteId) {
    return websites.find(function (website) {
        return website._id === websiteId;
    });
}



