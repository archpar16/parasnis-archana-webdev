var app = require('../../express');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findPageByWebsiteId);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];



function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = websiteId;
    pages.push(page);
    res.send(page);
}


function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    console.log(page);

    // find the index of oldpage
    var oldpage = findPageByIdInternal(pageId);
    var index = pages.indexOf(oldpage);

    // delete the old page
    pages.splice(index, 1);

    // Add the new page at the same location in array
    pages.splice(index, 0, page);

    res.send(page);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    deletePageInternal(pageId);
    res.sendStatus(200);
}

function deletePageInternal(pageId) {
    var page = findPageByIdInternal(pageId);
    var index = pages.indexOf(page);
    pages.splice(index, 1);
}

function findPageByWebsiteId(req, res) {
    var websiteId = req.params.websiteId;
    var result = [];

    for (var w in pages){
        if(pages[w].websiteId === websiteId) {
            result.push(pages[w]);
        }
    }
    res.send(result);
}

function findPageById(req, res) {
    var pageId = req.params.pageId;
    var page = findPageByIdInternal(pageId);
    res.send(page);
}


function findPageByIdInternal(pageId) {
    return pages.find(function (page) {
        return page._id === pageId;
    });
}



