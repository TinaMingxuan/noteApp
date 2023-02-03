const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) =>
         note.title === title
    )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const note_remove = notes.filter((note) =>
         note.title != title
    );

    if(notes.length > note_remove.length) {
        console.log('Notes removed');
        saveNotes(note_remove);
    } else {
        console.log('No note found');
    }

} 


const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('your notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })

}

const readNote =(title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)

    if(note) {
        console.log(chalk.inverse(note.title))
    } else {
        console.log(chalk.inverse('No note has found'));
    }
}



module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
}