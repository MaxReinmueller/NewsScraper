// require the dependencies
var mongoose = require('mongoose');

// create a schema
var Schema = mongoose.Schema;

// create a new schema
var noteSchema = new Schema({
    // the associated article we want to attach the note to
    // _headlineId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Headline"
    // },
    // date: String,
    noteText: String
});

// export out the schema
var Note = mongoose.model("Note", noteSchema);

module.exports = Note;