import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import { actions } from '../store/store';

import ValueIncrementer from './ValueIncrementer';
import IconButton from './IconButton';

import styles from '../styles/Settings.module.css';


const Settings = ({id}) => {
    const dispatch = useDispatch();

    const sessionLength = useSelector(state => state.session.length);
    const breakLength   = useSelector(state => state.break.length);

    const resetTimer = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(actions.resetTimer());
    };
    
    return (
        <div id={id} className={styles.main}>
            <h3 className={styles.heading}>{'Settings'}</h3>
            <div className={styles.settings}>
                <div className={styles.reset}>
                    <IconButton id={"reset"} icon={faUndoAlt} onClick={ resetTimer } />
                </div>
                <div className={styles.session}>
                    <ValueIncrementer idPrefix={"session"} title={"Session Length"} value={sessionLength} 
                                    setValue={(value) => dispatch(actions.setSessionLength(value))} />

                </div>
                <div className={styles.break}>
                    <ValueIncrementer idPrefix={"break"} title={"Break Length"} value={breakLength} 
                                    setValue={(value) => dispatch(actions.setBreakLength(value))} />
                </div>
            </div>
        </div>
    );
};

export default Settings;