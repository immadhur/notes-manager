import React from 'react';
import Note from './Note';
import axios from 'axios';
import NewNote from '../NewNote/NewNote';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';

const ListNotes=(props)=>{


console.log(props);
// const newnote = <DialogBoxModel show={isNewNoteDialogVisible} close={newNoteDialogCloseHandler}>
// <NewNote click={editNoteHandler} />
// </DialogBoxModel>

    return(
        <div>
            
            {props.notes.map(note=>{
                return <Note key={note._id} deleteClick={()=>props.delete(note._id)} 
                editClick={()=>props.edit(note._id)} data={note.data}/>
            })}
        </div>
    );
}

export default ListNotes;