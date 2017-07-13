
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findWebsiteById = findWebsiteById;
// websiteModel.findWebsiteByCredentials = findWebsiteByCredentials;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsitesByUser = findWebsitesByUser;
// websiteModel.removeWebsite = removeWebsite;
// websiteModel.findWebsiteByWebsitename = findWebsiteByWebsitename;

module.exports = websiteModel;

function removeWebsite(websiteId, websiteId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            var index = website._websites.indexOf(websiteId);
            website._websites.splice(index, 1);
            return website.save();
        });
}

function addWebsite(websiteId, websiteId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website._websites.push(websiteId);
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
    return websiteModel.remove({_id: websiteId});
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function createWebsite(userId, website) {
    website._user = userId;
    return websiteModel.create(website);
}

function findWebsitesByUser(userId) {
    return websiteModel.find({_user: userId});
}
