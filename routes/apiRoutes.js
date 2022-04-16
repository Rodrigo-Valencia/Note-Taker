const router = require('express').Router();
const data = require('../db/data');

router.get('/notes', function (req, res) {
    data.returnNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    data.newNote(req.body).then((note) => res.json(note)).catch(err => res.status(500).json(err));
});

router.delete('/notes/:id', function (req, res) {
    data.trashNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err));
});

module.exports = router;