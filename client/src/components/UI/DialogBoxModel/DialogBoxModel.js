import React, { Fragment } from 'react';
import style from './DialogBoxModel.module.css';
import Backdrop from '../Backdrop/Backdrop';

const DialogBox =props=> {
        return (
            <Fragment>
                <Backdrop click={props.close} isVisible={props.show} />
                <div className={style.Modal}
                    style={
                        {
                            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                            opacity: props.show ? "1" : "0"
                        }}>
                    {props.children}
                </div>
            </Fragment>
        );
    }

export default React.memo(DialogBox, (prevProps, nextProps)=>{
    return nextProps.show === prevProps.show ||
            nextProps.children === prevProps.children;
});