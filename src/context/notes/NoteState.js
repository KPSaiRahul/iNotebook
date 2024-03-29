import React, { useState } from 'react'
import NoteContext from './noteContext'


// STORE STATES WITHOUT PASSING PROPS FROM CHILDREN TO CHILDREN AND INSTEAD PASS THEM WHENEVER NEEDED THROUGH VALUE

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token")
      }
    });
    // const json = response.json(); // parses JSON response into native JavaScript objects

    const json = await response.json();
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    // to do api call
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json(); // parses JSON response into native JavaScript objects
    const note = await response.json();
    setNotes(notes.concat(note));
  }



  //Delete a note 
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    const newNotes = notes.filter((note) => note._id !== id)
    setNotes(newNotes);
  }



  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", // 'Content-Type': 'application/x-www-form-urlencoded',
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify( notes ));
    //Logic to edit on client's end
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children};
    </NoteContext.Provider>

  )
}

export default NoteState;