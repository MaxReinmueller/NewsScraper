// require models
var Note = require('../models/Note');
var makeDate = require('../scripts/date');

// export the CRUD functions
module.exports = {
    // Read
    get: function(data, cb) {
        Note.find({
            _headlineID: Data._id
        }, cb);
    },
    // Create
    save: function(data, cb) {
        var newNote = {
            _headlineID: data._id,
            date: makeDate(),
            noteText: data.noteText
        };
        Note.create(newNote, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    // Delete
    delete: function(data, cb) {
        note.remove({
            _id: data._id
        }, cb)
    }
}