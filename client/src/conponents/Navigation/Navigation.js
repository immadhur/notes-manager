import React from 'react';
import style from './Navigation.module.css'

const Navigation=(props)=>{
    return(
        <nav className={style.nav}>
            <h2>Notes App</h2>
            <p onClick={props.logout}>Logout</p>
        </nav>
    );
}

export default Navigation;