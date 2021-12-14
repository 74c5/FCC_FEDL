import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPlay, faPause, faStepForward, faStop, faUndoAlt, faEllipsisH, faEllipsisV, faCog } from '@fortawesome/free-solid-svg-icons';


import { actions, TIMER_STATES } from '../store/store';

import IconButton from './IconButton';

import styles from '../styles/Controls.module.css';


const makeOnClick = (dispatch, action) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(action());
};

const Controls = ({id}) => {
    const dispatch = useDispatch();

    const status = useSelector(state => state.timer.status);

    const playIcon = (status == TIMER_STATES.running) ? faStop : faPlay;

    return (
        <div id={id} className={styles.controls}>
            <IconButton id={"reset"}      icon={faUndoAlt} onClick={ makeOnClick(dispatch, actions.resetTimer) } />
        </div>
    );
};

export default Controls;