var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgetModel = require('../Models/Widget/widget.model.server');

app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.post('/api/page/:pageId/widget', createWidget);
app.post('/page/:pageId/widget', reorderWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

function createWidget(req, res) {
    var pageId = req.params.pageId;
    // retrieve the new widget
    var widget = req.body;
    console.log('creating the new widget ' + widget.widgetType);
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.send(widget);
        },function (error) {
            console.log('creating the new widget failed ' + error );
            res.sendStatus(404);
        });
}


function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    console.log(widget);

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (widget) {
            res.send(widget);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    console.log('deleting ' + widgetId);

    widgetModel
        .deleteWidget(widgetId)
        .then(function (widget) {
            res.sendStatus(200);
        }, function (err) {
            res.sendStatus(404);
        });
}


function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    widgetModel
        .findWidgetsByPageId(pageId)
        .then(function (page) {
            res.send(page.widgets);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findWidgetById(req, res) {
    console.log("finding ");
    var widgetId = req.params.widgetId;
    // console.log("finding the widget" + widgetId);

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            if (widget != null)
                res.send(widget);
            else
                res.sendStatus(404);
        });
}


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.user._id;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    console.log('myfile = '+ myFile);
    if(typeof myFile === 'undefined') {
        var callback   = "/assignment/index.html#!/user/website/"+websiteId+'/page/'+pageId+'/widget';

        res.redirect(callback);
        return;
    }

    var originalname = myFile.originalname;
    // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    console.log(myFile);
    console.log(userId + "  " + widgetId + "  " + pageId);
    if (typeof width === 'undefined') {
        console.log('setting width to 100%');
        width = '100%';
    }

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            console.log('in  here');
            if (widget != null) {
                // console.log('already present');
                widget.url = '/uploads/' + filename;
                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function (widget) {
                        return widget;
                    });
            }
        }, function (error) {
            // create a new widget if one already doesn't exist

            var newWidget = {
                widgetType: "IMAGE",
                width: width
            };
            newWidget.url = '/uploads/' + filename;

            widgetModel
                .createWidget(pageId, newWidget)
                .then(function (widget) {
                    return widget;
                });
        });

    var callbackUrl   = "/assignment/index.html#!/user/website/"+websiteId+'/page/'+pageId+'/widget';

    res.redirect(callbackUrl);
}

function reorderWidget(req, res) {
    var start = req.query['initial'];
    var stop = req.query['final'];

    var pageId = req.params.pageId;

    widgetModel
        .reorderWidgets(start, stop, pageId)
        .then(function (wigets) {
            res.sendStatus(200);
        });
}
