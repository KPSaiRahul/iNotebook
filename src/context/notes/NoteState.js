import React, { useState } from 'react'
import NoteContext from './noteContext'


// STORE STATES WITHOUT PASSING PROPS FROM CHILDREN TO CHILDREN AND INSTEAD PASS THEM WHENEVER NEEDED THROUGH VALUE

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "65d2478222dfd8f25725b70a",
          "user": "65d1da875c52cdd8b9e9ac04",
          "title": "My Title",
          "description": "Please wake me up early",
          "tag": "personal",
          "date": "2024-02-18T18:07:57.793Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial);
    return  (
        <NoteContext.Provider value = {{notes, setNotes}}>
            {props.children};
        </NoteContext.Provider>

    )
} 

export default NoteState;