const fs = require('fs');
const util = require('util');

const writeNote = util.promisify(fs.writeFile);
const readNote = util.promisify(fs.readFile);

class Save {
    read() {
        return readNote('db/db.json');
    }
    write(note) {
        return writeNote('db/db.json', JSON.stringify(note));
    }

    returnNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    newNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Can not enter blank note!');
        }
        const addNewNote = { title, text };

        return this.returnNotes()
            .then(notes => [...notes, addNewNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => addNewNote);
    }

    trashNote(id) {
        return this.returnNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes));
    }
}

module.exports = new Save();