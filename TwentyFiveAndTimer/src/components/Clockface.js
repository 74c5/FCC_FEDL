import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faPlay, faStop,  } from '@fortawesome/free-solid-svg-icons';

import ProgressRing from './ProgressRing';
import IconButton from './IconButton';

import { actions, TIMER_STATES } from '../store/store';

import styles from '../styles/Clockface.module.css'

const makeOnClick = (dispatch, action) => (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(action());
};

const Clockface = ({id}) => {
    const dispatch = useDispatch();

    const label  = useSelector(state => state.timer.label);
    const value  = useSelector(state => state.timer.value);
    const limit  = useSelector(state => state.timer.length);
    const color  = useSelector(state => state.timer.color);
    const status = useSelector(state => state.timer.status);
    
    const remaining = limit - value;
    const min   = String( Math.floor( remaining / 60000 ) ).padStart(2, '0');
    const sec   = String( Math.floor((remaining / 1000) % 60) ).padStart(2., '0');
    
    const playIcon = (status == TIMER_STATES.running) ? faStop : faPlay;
    const togglePlay = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(actions.toggleTimer());
    }

    return (
        <div id={id} className={styles.clockFace} onClick={ togglePlay }>
            <ProgressRing id={'progressRing'} width={300} stroke={5} ratio={value/limit} color={color}/>
            <div className={styles.inner}>
                <h3 id={'timer-label'} style={ {color: color}}>{label}</h3>
                <div id={'time-left'} className={styles.timer}>
                    {min}<span className={styles.divider}>:</span>{sec}
                </div>
                <IconButton id={"start_stop"} icon={playIcon}  onClick={ togglePlay } />
            </div>
        </div>
    );
};

export default Clockface;