import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Home.module.css';
import { Redirect } from 'react-router-dom';
import NewNote from '../NewNote/NewNote';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import ListNotes from '../Note/ListNotes';
import Spinner from '../UI/Spinner/Spinner';

const Home = (props) => {
    let [notes, setNotes] = useState([]);
    let [logout, setLogout] = useState(false);
    let [isNewNoteDialogVisible, setisNewNoteDialogVisible] = useState(false);
    let [isEditNoteDialogVisible, setisEditNoteDialogVisible] = useState(false);
    let [isLoading, setIsLoading] = useState(false);
    let [currentNoteData, setCurrentNoteData]=useState('');
    let [currentKey, setCurrentKey]=useState('');

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:4000/notes', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setIsLoading(false);
            if (res.status === 501)
                setLogout(true)
            console.log(res);
            setNotes(res.data.notes);
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
            setLogout(true)
        })
    }, [isNewNoteDialogVisible])

    const logoutHandler = () => {
        setIsLoading(true);
        console.log(localStorage.getItem('token'));
        axios.post('http://localhost:4000/logout', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setIsLoading(false);
            localStorage.removeItem('token');
            setLogout(true);
        }).catch(err => {
            setIsLoading(false);
        })
    }

    const newNoteDialogCloseHandler = () => {
        setisNewNoteDialogVisible(false);
    }

    const editDialogCloseHandler = () => {
        setisEditNoteDialogVisible(false);
    }

    const showNewNoteDialogHandler = () => {
        setisNewNoteDialogVisible(true);
    }

    const addNewNoteHandler = (e, data) => {
        console.log(data);
        setIsLoading(true);
        axios.post('http://localhost:4000/notes/add', {
            data
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setIsLoading(false);
            console.log(res);
            setisNewNoteDialogVisible(false);
        }).catch(err => {
            setIsLoading(false);
            console.log(err);
            setisNewNoteDialogVisible(false);
        })
    }

    const deleteNoteHandler = async (key) => {
        setIsLoading(true);
        const res = await axios.delete(`http://localhost:4000/note/${key}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setIsLoading(false);
        if (res.status === 200) {
            const updtNotes = [...notes].filter(note => note._id !== key);
            setNotes(updtNotes);
        }
    }


    const editNoteHandler=(key)=>{
        const data=notes.filter(note=>note._id===key)[0].data
        console.log(data);
        setCurrentKey(key);
        setCurrentNoteData(data);
        setisEditNoteDialogVisible(true);
    }

    const updateNoteHandler = async (key, data) => {
        const res = await axios.patch(`http://localhost:4000/note/${key}`, {data}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    
    let editNote=<DialogBoxModel show={isEditNoteDialogVisible} close={editDialogCloseHandler}>
    <NewNote id={currentKey} data={currentNoteData} click={updateNoteHandler} />
</DialogBoxModel>;

    const newnote = <DialogBoxModel show={isNewNoteDialogVisible} close={newNoteDialogCloseHandler}>
        <NewNote click={addNewNoteHandler} />
    </DialogBoxModel>

    return (
        <>
            {isLoading ? <Spinner /> :
                <div className={style.body}>
                    <Navigation logout={logoutHandler} />
                    <>
                        {newnote}
                        {editNote}
                        <button onClick={showNewNoteDialogHandler} className={style.floatingButton}>+</button>
                    </>
                    {logout ?
                        <Redirect to='/login' /> :
                        notes.length > 0 ?
                            <ListNotes notes={notes} delete={deleteNoteHandler} edit={editNoteHandler} />
                            :
                            <h2 className={style.noNotes}>No Notes Found</h2>}
                </div>
            }
        </>
    );
}

export default Home;