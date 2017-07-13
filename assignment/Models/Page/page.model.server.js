
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
// pageModel.findPageByCredentials = findPageByCredentials;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
// pageModel.removePage = removePage;
// pageModel.findPageByPagename = findPageByPagename;

module.exports = pageModel;

function removePage(pageId, pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page._pages.indexOf(pageId);
            page._pages.splice(index, 1);
            return page.save();
        });
}

function addPage(pageId, pageId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page._pages.push(pageId);
            return page.save();
        })
}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {
        $set : {
            name: newPage.name,
            description: newPage.description,
            title: newPage.title
        }
    });
}

function deletePage(pageId) {
    return pageModel.remove({_id: pageId});
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel.create(page);
}

function findPagesByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId});
}

