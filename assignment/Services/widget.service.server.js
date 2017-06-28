var app = require('../../express');
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.post('/api/page/:pageId/widget', createWidget);
app.post('/page/:pageId/widget', sortWidget);
app.get('/api/page/:pageId/widget', findWidgetsByPageId);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Ever since astronomers <a href="http://gizmodo.com/new-earth-like-exoplanet-could-be-discovery-of-the-cent-1785614793#_ga=2.67003244.390029006.1495112369-1520736541.1475842057" rel="nofollow">announced the discovery</a> of an Earth-sized exoplanet <a href="http://gizmodo.com/there-may-be-an-earth-like-exoplanet-less-than-five-lig-1785457935" rel="nofollow">less than five light years</a> down the cosmic street, the question on every good space cadet’s mind has been whether or not we can colonize it. We’re not going to know if <em>Proxima b</em> is habitable <a href="http://gizmodo.com/how-well-get-our-first-big-clue-about-life-on-proxima-b-1785942106" rel="nofollow">until we can point some very powerful telescopes at it</a>, which won’t happen until next year. But until then, scientists are playing around with models—and one such modeling effort recently came to some promising conclusions.</p>'},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];


function createWidget(req, res) {
    var pageId = req.params.pageId;
    // retrieve the new widget
    var widget = req.body;

    createWidgetInternal(widget, pageId);
    res.send(widget);
}


function createWidgetInternal(widget, pageId) {
    console.log("creating a new widget");
    console.log(widget);
    // add id & parent
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    // save it
    widgets.push(widget);
}

function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    console.log(widget);

    // find the index of oldwidget
    var oldWidget = findWidgetByIdInternal(widgetId);
    var index = widgets.indexOf(oldWidget);

    // delete the old widget
    widgets.splice(index, 1);

    // Add the new widget at the same location in array
    widgets.splice(index, 0, widget);

    res.send(widget);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    deleteWidgetInternal(widgetId);
    res.sendStatus(200);
}

function deleteWidgetInternal(widgetId) {
    var widget = findWidgetByIdInternal(widgetId);
    var index = widgets.indexOf(widget);
    widgets.splice(index, 1);
}

function findWidgetsByPageId(req, res) {
    var pageId = req.params.pageId;
    var result = findWidgetsByPageIdInternal(pageId);
    res.send(result);
}

function findWidgetsByPageIdInternal(pageId) {
    var result = [];

    for (var w in widgets){
        if(widgets[w].pageId === pageId) {
            result.push(widgets[w]);
        }
    }
    return result;
}

function findWidgetById(req, res) {
    console.log("finding ");
    // res.send(200);
    var widgetId = req.params.widgetId;
    console.log("finding the widget" + widgetId);
    var widget = findWidgetByIdInternal(widgetId);
    console.log(widget);
    if (typeof widget !== 'undefined') {
        res.send(widget);
        return;
    }
    console.log("send 404");
    res.sendStatus(404);
}


function findWidgetByIdInternal(widgetId) {
    return widgets.find(function (widget) {
        return widget._id === widgetId;
    });
}


function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    console.log(myFile);
    console.log(userId + websiteId + pageId);

    var widget = findWidgetByIdInternal(widgetId);
    if (typeof widget === 'undefined') {
        var newWidget = { widgetType: "IMAGE"};
        createWidgetInternal(newWidget, pageId);
        newWidget.url = '/uploads/'+filename;
    } else
        widget.url = '/uploads/'+filename;

    var callbackUrl   = "/assignment/index.html#!/user/"+userId+"/website/"+websiteId+'/page/'+pageId+'/widget';

    res.redirect(callbackUrl);
}


function sortWidget(req, res) {
    var start = req.query['initial'];
    var stop = req.query['final'];

    var pageId = req.params.pageId;

    var widget = widgets[start];
    console.log(widget);
    widgets.splice(start, 1);
    widgets.splice(stop, 0, widget);
    console.log("index=" + widgets.indexOf(widget));
    res.sendStatus(200);

}

