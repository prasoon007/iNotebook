import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {   
    const noteInitial = [
        {
          "_id": "6155d200e0a869b2324b1c90",
          "user": "615013bd1f10f7cd858814b2",
          "title": "prasoon",
          "description": "class notes 2:- reproduction",
          "tag": "Science",
          "date": "2021-09-30T15:04:32.502Z",
          "__v": 0
        },
        {
          "_id": "6155d21be0a869b2324b1c92",
          "user": "615013bd1f10f7cd858814b2",
          "title": "prasoon 2",
          "description": "class notes 3:- digestion",
          "tag": "Science",
          "date": "2021-09-30T15:04:59.671Z",
          "__v": 0
        },
        {
          "_id": "6155d249e0a869b2324b1c94",
          "user": "615013bd1f10f7cd858814b2",
          "title": "prasoon 3",
          "description": "class notes 4:- digestion",
          "tag": "Science",
          "date": "2021-09-30T15:05:45.256Z",
          "__v": 0
        },
        {
          "_id": "6155d21be0a869b2324b1c92",
          "user": "615013bd1f10f7cd858814b2",
          "title": "prasoon 2",
          "description": "class notes 3:- digestion",
          "tag": "Science",
          "date": "2021-09-30T15:04:59.671Z",
          "__v": 0
        },
        {
          "_id": "6155d249e0a869b2324b1c94",
          "user": "615013bd1f10f7cd858814b2",
          "title": "prasoon 3",
          "description": "class notes 4:- digestion",
          "tag": "Science",
          "date": "2021-09-30T15:05:45.256Z",
          "__v": 0
        }
      ]

    const [notes, setNotes] = useState(noteInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;