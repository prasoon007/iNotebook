import React, { useContext, useState } from 'react'
import NoteContext from '../components/context/notes/NoteContext';

const AddNote = () => {
    const [note, setNotes] = useState({ title: "", description: "", tag: "default" });
    const context = useContext(NoteContext);
    const { addNote } = context;
    const onClickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    };
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    };
    return (
        <>
            <form>
                <div className="mb-3" style={{ width: '30%' }}>
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3" style={{ width: '30%' }}>
                    <label htmlFor="exampleInputDescription1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3" style={{ width: '30%' }}>
                    <label htmlFor="exampleInputDescription1" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length<5 && note.description.length<5} onClick={onClickHandle} className="btn btn-primary">Add Note</button>
            </form>
        </>)
}

export default AddNote
