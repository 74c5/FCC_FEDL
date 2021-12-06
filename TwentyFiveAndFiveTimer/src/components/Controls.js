import React from 'react';
import { useSelector } from 'react-redux';
import { faPlay, faPause, faStepForward, faStop, faEllipsisH, faEllipsisV, faCog } from '@fortawesome/free-solid-svg-icons';


import { toggleSettingsModal } from '../logic/app';
import { TIMER_STATES, toggleTimer, stopTimer, nextTimer } from '../logic/timer';

import IconButton from './IconButton';

import styles from '../styles/Controls.module.css';


const playPause = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleTimer();
};
const stop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    stopTimer();
};
const next = (event) => {
    event.preventDefault();
    event.stopPropagation();
    nextTimer();
};
const showSettings = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSettingsModal();
};

const Controls = ({id}) => {
    const status = useSelector(state => state.timer.status);

    const playIcon = (status == TIMER_STATES.running) ? faPause : faPlay;

    return (
        <div id={id} className={styles.controls}>
            <IconButton id={"play-pause"} icon={playIcon}      onClick={playPause} />
            <IconButton id={"stop"}       icon={faStop}        onClick={stop} />
            <IconButton id={"next"}       icon={faStepForward} onClick={next} />
            <IconButton id={"settings"}   icon={faCog}         onClick={showSettings} />
        </div>
    );
};

export default Controls;