
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetsByPageId = findWidgetsByPageId;
// widgetModel.removeWidget = removeWidget;
// widgetModel.findWidgetByWidgetname = findWidgetByWidgetname;

module.exports = widgetModel;

function removeWidget(widgetId, widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var index = widget._widgets.indexOf(widgetId);
            widget._widgets.splice(index, 1);
            return widget.save();
        });
}

function addWidget(widgetId, widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            widget._widgets.push(widgetId);
            return widget.save();
        })
}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {
        $set : newWidget
    });
}

function deleteWidget(widgetId) {
    return widgetModel.remove({_id: widgetId});
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.create(widget);
}

function findWidgetsByPageId(pageId) {
    return widgetModel.find({_page: pageId});
}
