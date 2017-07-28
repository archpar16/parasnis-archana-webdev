
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

var userModel = require('../User/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
websiteModel.removePage = removePage;
websiteModel.addPage = addPage;

module.exports = websiteModel;

function removePage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function addPage(websiteId, pageId) {
    console.log(' page id ' + pageId);
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            console.log(' lskdks' + website.pages);
            website.pages.push(pageId);
            return website.save();
        })
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name: newWebsite.name,
            description: newWebsite.description
        }
    });
}

function deleteWebsite(websiteId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var userId = website._user;
            console.log('in delete website - user id' + userId);
            return websiteModel
                .remove({_id: websiteId})
                .then(function () {
                    return userModel
                        .removeWebsite(userId, websiteId);
                });
        });
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id);
        });
}

function findWebsitesByUser(userId) {
    return websiteModel.find({_user: userId});
}
