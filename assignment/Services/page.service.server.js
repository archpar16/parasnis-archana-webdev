var app = require('../../express');
var pageModel = require('../Models/Page/page.model.server');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findPagesByWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);


function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    console.log('create new page ' + page);
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.send(page);
        });
}

function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    console.log(page);

    pageModel
        .updatePage(pageId, page)
        .then(function (page) {
            res.send(page);
        });
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function (page) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findPagesByWebsite(req, res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findPagesByWebsiteId(websiteId)
        .then(function (pages) {
            res.send(pages);
        });
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.send(page);
        });
}


