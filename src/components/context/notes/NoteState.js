import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = 'http://localhost:5000/api/notes';

  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MDEzYmQxZjEwZjdjZDg1ODgxNGIyIn0sImlhdCI6MTYzMzAxNDIwN30.Q_7CzStSKIdDcg0FKNFxYBrvEMSXDyyUEk6W-zQSHt0'
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  //add note  
  const addNote = async (title, description, tag) => {
    //call api
    const response = await fetch(`${host}/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MDEzYmQxZjEwZjdjZDg1ODgxNGIyIn0sImlhdCI6MTYzMzAxNDIwN30.Q_7CzStSKIdDcg0FKNFxYBrvEMSXDyyUEk6W-zQSHt0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  }

  //delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MDEzYmQxZjEwZjdjZDg1ODgxNGIyIn0sImlhdCI6MTYzMzAxNDIwN30.Q_7CzStSKIdDcg0FKNFxYBrvEMSXDyyUEk6W-zQSHt0'
      }
    });
    console.log(response);
    const newNotes = notes.filter((note) => {
      return id !== note._id;
    });
    setNotes(newNotes);
  }

  //edit note
  const editNote = async (id, title, description, tag) => {
    //api callfetchallnotes
    let url = `http://localhost:5000/api/notes/updatenotes/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE1MDEzYmQxZjEwZjdjZDg1ODgxNGIyIn0sImlhdCI6MTYzMzAxNDIwN30.Q_7CzStSKIdDcg0FKNFxYBrvEMSXDyyUEk6W-zQSHt0'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    //client update logic
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState;