
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('../Page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;

module.exports = widgetModel;

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {
        $set : newWidget
    });
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            console.log('in delete widget - page id' + pageId);
            return widgetModel
                .remove({_id: widgetId})
                .then(function () {
                    return pageModel
                        .removeWidget(pageId, widgetId);
                });
        });
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    console.log('widget type = ' + widget.widgetType);
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id);
            return widget;
        });
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({_page: pageId});
}
