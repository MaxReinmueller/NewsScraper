// require the dependencies
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

// create a new schema
var headlineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

// export out the schema
var Headline = mongoose.model("Headline", headlineSchema);

module.exports = Headline;