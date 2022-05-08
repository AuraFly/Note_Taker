//Setting constants for express.router, fsUtils
const notesRt = require('express').Router();
const {reFile, reAppend, wrFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notesRt.get('/', (req, res) => {

    reFile('./db/db.json').then((input) =>
    res.json(JSON.parse(input)));
});

// POST Route for submitting a note
notesRt.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
        title,
        text,
        note_id: uuid(),
    };

reAppend(newNote, './db/db.json');
    res.json("Your note has been saved.");
        } else {
            res.error("There was an error saving your note.");
            }
        });
        
//TODO - WRITE DELETE FUNCTION.

module.exports = notesRt;