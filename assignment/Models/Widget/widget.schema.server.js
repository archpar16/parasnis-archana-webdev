var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({

    _page:  {type: mongoose.Schema.Types.ObjectId, ref:"PageModel"},
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXTINPUT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "Widget"});
// export the schema
module.exports = widgetSchema;

