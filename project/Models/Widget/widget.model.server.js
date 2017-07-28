
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

var pageModel = require('../Page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
widgetModel.reorderWidgets = reorderWidgets;

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
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec();
}

function reorderWidgets(start, stop, pageId) {
    return pageModel
        .findPageById(pageId)
        .then(function (page) {
            var widgets = page.widgets;
            var widget = widgets[start];
            console.log('moving widget from ' + start + ' to ' + stop);
            widgets.splice(start, 1);
            widgets.splice(stop, 0, widget);
            pageModel
                .update({_id: pageId},{$set: {widgets: page.widgets}})
                .then(function (page) {
                    // console.log('now widgets is ' + page.widgets);
                });
        })
}
