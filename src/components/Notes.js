import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import NoteContext from '../components/context/notes/NoteContext';
import NotesItem from './NotesItem';


function Notes(props) {
    let history = useHistory()
    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;
    const [note, setNotes] = useState({ id: '', etitle: "", edescription: "", etag: "default" });
    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
            // eslint-disable-next-line
        } else history.push('/login');
    }, [])
    const ref = useRef('');
    const updateNotes = (currentNote) => {
        ref.current.click();
        setNotes({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };
    const onClickHandle = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.updateAlert('Note updated', 'success');
    };
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    };
    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" onChange={onChange} className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
                                    <input type="text" onChange={onChange} className="form-control" id="edescription" value={note.edescription} name="edescription" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDescription1" className="form-label">Tag</label>
                                    <input type="text" onChange={onChange} value={note.etag} className="form-control" id="etag" name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 && note.edescription.length} type="button" onClick={onClickHandle} className="btn btn-primary" data-bs-dismiss="modal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {notes.length === 0 ? <div className="container">No notes to display</div> : notes.map((note) => {
                    return <div className="col-md-3" key={note._id}>
                        <NotesItem note={note} updateNotes={updateNotes} updateAlert={props.updateAlert}/>
                    </div>
                })}
            </div>
        </>
    )
}

export default Notes
