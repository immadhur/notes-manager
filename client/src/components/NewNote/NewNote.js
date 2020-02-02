import React, {useRef, useState, useEffect} from 'react';
import style from './NewNote.module.css'

const NewNote=(props)=>{
    const [inputData, setInputData]=useState('');

    useEffect(()=>{
        setInputData(props.data?props.data:'');
    }, [props.data?props.data:''])

    const textChangeHandler=(e)=>{
        setInputData(e.target.value);
    }

    return(
        <form className={style.body}>
            <h2>{props.id?'Edit':'Add new'} Note</h2>
            <input type='text' value={inputData} onChange={textChangeHandler}/>
            <button onClick={(e)=>props.click(e, props.id, inputData)}>{props.id?'Edit':'Add'}</button>
        </form>
    )
}

export default NewNote