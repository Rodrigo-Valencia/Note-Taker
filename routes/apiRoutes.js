const fs = require('fs');

module.exports = function (app) {
    // The application should have a db.json on the backend that will be used to store and retireve notes using the fs module. 

    // GET/api/notes - should read the bd.json file and return all saved notes as JSON.
    app.get('/api/notes', function (req, res) {
        console.log('Getting Notes');
        fs.readFile('db/db.json', 'utf8', (err, data) => {
            if (err) throw err;
            let notes = JSON.parse(data);
            res.json(notes);
        });
    });
}