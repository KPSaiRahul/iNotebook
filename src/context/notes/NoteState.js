import React, { useState } from 'react'
import NoteContext from './noteContext'


// STORE STATES WITHOUT PASSING PROPS FROM CHILDREN TO CHILDREN AND INSTEAD PASS THEM WHENEVER NEEDED THROUGH VALUE
const NoteState = (props) =>{

    return  (
        <NoteContext.Provider value = {{}}>
            {props.children};
        </NoteContext.Provider>
    )
} 

export default NoteState;