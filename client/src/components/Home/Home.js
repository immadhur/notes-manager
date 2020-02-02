import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import style from './Home.module.css';
import { Redirect } from 'react-router-dom';
import NewNote from '../NewNote/NewNote';
import DialogBoxModel from '../UI/DialogBoxModel/DialogBoxModel';
import Navigation from '../Navigation/Navigation';
import ListNotes from '../Note/ListNotes';
import Spinner from '../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as action from '../../store/actions/actions';

const Home = (props) => {
    let [isNewNoteDialogVisible, setisNewNoteDialogVisible] = useState(false);
    let [isEditNoteDialogVisible, setisEditNoteDialogVisible] = useState(false);
    let [errorDialogVisibility, setErrorDialogVisibility] = useState(false);
    let [currentNoteData, setCurrentNoteData] = useState('');
    let [currentKey, setCurrentKey] = useState('');

    useEffect(() => {
        props.getNotes();
    }, [isNewNoteDialogVisible])

    useEffect(() => {
        setErrorDialogVisibility(props.error != null);
    }, [props.error])

    const logoutHandler = () => {
        props.logout();
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

    const addNewNoteHandler = (e, key, data) => {
        e.preventDefault();
        console.log(data);
        props.addNote(data);
        setisNewNoteDialogVisible(false);
    }

    const deleteNoteHandler = (key) => {
        props.deleteNote(key);
    }


    const editNoteHandler = (key) => {
        const data = props.notes.filter(note => note._id === key)[0].data
        console.log(data);
        setCurrentKey(key);
        setCurrentNoteData(data);
        setisEditNoteDialogVisible(true);
    }

    const updateNoteHandler = async (e, key, data) => {
        e.preventDefault();
        console.log(data);
        try {
            const res = await axios.patch(`/note/${key}`, { data }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setisEditNoteDialogVisible(false);
            props.getNotes();
        }
        catch (err) {
            console.log(err);
            setisEditNoteDialogVisible(false);
            setErrorDialogVisibility(true);
        }
    }


    let editNote = <DialogBoxModel show={isEditNoteDialogVisible} close={editDialogCloseHandler}>
        <NewNote id={currentKey} data={currentNoteData} click={updateNoteHandler} />
    </DialogBoxModel>;

    const newnote = <DialogBoxModel show={isNewNoteDialogVisible} close={newNoteDialogCloseHandler}>
        <NewNote click={addNewNoteHandler} />
    </DialogBoxModel>

    const errorDialog = <DialogBoxModel show={errorDialogVisibility} close={() => setErrorDialogVisibility(false)}>
        <p>{props.error}</p>
    </DialogBoxModel>

    return (
        <>
            {errorDialog}
            {props.loading ? <Spinner /> :
                <div className={style.body}>
                    <Navigation logout={logoutHandler} />
                    <>
                        {newnote}
                        {editNote}
                        <button onClick={showNewNoteDialogHandler} className={style.floatingButton}>+</button>
                    </>
                    {/* {props.logout && props.authLoading ?
                        <Redirect to='/login' /> : */}
                    {props.notes.length > 0 ?
                        <ListNotes notes={props.notes} delete={deleteNoteHandler} edit={editNoteHandler} />
                        :
                        <h2 className={style.noNotes}>No Notes Found</h2>}
                </div>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state.auth);
    return {
        loading: state.notes.loading,
        notes: state.notes.notes,
        authLoading:state.auth.loading,
        logout: !state.auth.isLoggedIn,
        error: state.notes.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNotes: () => dispatch(action.getNotes()),
        addNote: (data) => dispatch(action.addNote(data)),
        deleteNote: (key) => dispatch(action.deleteNote(key)),
        logout: () => dispatch(action.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);