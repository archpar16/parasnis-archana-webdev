
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

var websiteModel = require('../Website/website.model.server');

pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;
pageModel.findPagesByWebsiteId = findPagesByWebsiteId;

pageModel.removeWidget = removeWidget;
pageModel.addWidget =addWidget;

module.exports = pageModel;

function removeWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
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
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            console.log('in delete page - web id' + websiteId);
            return pageModel
                .remove({_id: pageId})
                .then(function () {
                    return websiteModel
                        .removePage(websiteId, pageId);
                });
        });
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function createPage(websiteId, page) {
    // console.log('in create page');
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            // console.log('now adding page');
            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function findPagesByWebsiteId(websiteId) {
    return pageModel.find({_website: websiteId});
}

