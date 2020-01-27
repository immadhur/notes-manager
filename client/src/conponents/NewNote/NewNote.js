import React, {useRef} from 'react';
import style from './NewNote.module.css'

const NewNote=(props)=>{
    let inputData=useRef(props.data);
    return(
        <form className={style.body}>
            <h2>Add new Note</h2>
            <input ref={inputData}/>
            <button onClick={()=>props.click(props.id, inputData.current.value)}>{props.id?'Edit':'Add'}</button>
        </form>
    )
}

export default NewNote