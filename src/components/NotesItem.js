import React,{ useContext } from 'react';
import NoteContext from '../components/context/notes/NoteContext';

function NotesItem(props) {
    const context = useContext(NoteContext);
    const {note, updateNotes, updateAlert} = props;
    const { deleteNote } = context;
    return (
        <>
            <div className="card my-3">
                <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fas fa-trash mx-2" onClick={() => {
                    deleteNote(note._id);
                    updateAlert('Note Deleted', 'success')
                } }></i>
                <i className="far fa-edit mx-2" onClick={() => {updateNotes(note)}}></i>
                </div>
            </div>
        </>

    )
}

export default NotesItem
