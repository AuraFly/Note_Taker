//Setting consts for express and routes.
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

//setting const for port which should utilize environmental port for heroku or 3001
const PORT = process.env.PORT || 3001;

//const used for utilizing express after import above
const app = express();

//Middleware to be used:
//allows app to negotiate/translate JSON and URLs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//sets root for static files
app.use(express.static('public'));
//setting path and callback
app.use('/api', api);

//Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Utilized ports specified above.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);