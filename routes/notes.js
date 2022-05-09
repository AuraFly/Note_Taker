//Setting constants for express.router, fsUtils
const notesRt = require('express').Router();
const fs = require('fs');
const {reFile, reAppend, wrFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notesRt.get('/', (req, res) => {
    reFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data)));
});

// POST Route for submitting a note ***UTILIZED WHEN SAVE ICON PRESSED*
//Checks if there is anything in the resoponse body, if there is save it to the db with an id using UUID.
notesRt.post('/', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
        title,
        text,
        id: uuid(),
    };
reAppend(newNote, './db/db.json');
    res.json("Your note has been saved.");
    }
});
        
//Uses id assigned with uuid to remove the assigned data from the db, then rewrite
// I struggled with this a while. I think I get it after some help, but will ask for help from
// tutor.
notesRt.delete('/:id', (req, res) => {
    reFile('./db/db.json').then((fInfo) => {
        let agData = JSON.parse(fInfo);
        agData = agData.filter(({ id }) =>
        id !== req.params.id);

        wrFile('./db/db.json', agData);
        res.json(agData)
});
});

module.exports = notesRt;