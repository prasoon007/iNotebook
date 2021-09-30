import React, { useContext } from 'react'
import NoteContext from '../components/context/notes/NoteContext';
import NotesItem from './NotesItem';


function Notes() {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
    return (
        <>
            <div className="row">
                {notes.map((note) => {
                    return <div className="col-md-3">
                        <NotesItem notes={note}/>
                    </div>
                })}
            </div>

        </>
    )
}

export default Notes
