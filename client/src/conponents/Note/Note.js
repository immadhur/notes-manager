import React from 'react';
import style from './Note.module.css'

const Note = (props) => {
    return (
        <div className={style.body}>
            <p>{props.data}</p>
            <div>
                <button onClick={props.editClick}>Edit</button>
                <button onClick={props.deleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default Note;