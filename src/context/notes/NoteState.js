import React, { useState } from 'react'
import NoteContext from './noteContext'


// STORE STATES WITHOUT PASSING PROPS FROM CHILDREN TO CHILDREN AND INSTEAD PASS THEM WHENEVER NEEDED THROUGH VALUE

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "65d2178222dfd3f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    },
    {
      "_id": "65d2978222dff8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    }, {
      "_id": "65d1378222dfd1f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    },
    {
      "_id": "65d2028222dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    },
    {
      "_id": "65d2578222dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    }, {
      "_id": "65d2488222dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    },
    {
      "_id": "65d3478222dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    },
    {
      "_id": "65d2978222dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    }, {
      "_id": "65d2478122dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": "My Title",
      "description": "Please wake me up early",
      "tag": "personal",
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title, description, tag) => {
    // to do api call
    const note = {
      "_id": "65d2478122dfd8f25725b70a",
      "user": "65d1da875c52cdd8b9e9ac04",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-02-18T18:07:57.793Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }
  //Delete a note 
  const deleteNote = () => {

  }
  //Edit a note
  const editNote = () => {

  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote }}>
      {props.children};
    </NoteContext.Provider>

  )
}

export default NoteState;