import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStop, faEllipsisH, faEllipsisV, faCog } from '@fortawesome/free-solid-svg-icons';
import { DISPLAYMAP, submitSymbol } from '../logic/controller';
import './Controls.scss';


const playPause = (event) => {
    event.preventDefault();
    console.log(`Play button pressed`);
};
const stopTimer = (event) => {
    event.preventDefault();
    console.log(`Stop button pressed`);
};
const nextTimer = (event) => {
    event.preventDefault();
    console.log(`nextTimer button pressed`);
};
const showSettings = (event) => {
    event.preventDefault();
    console.log(`Open Settings button pressed`);
};

const Controls = ({id}) => {
    const status = useSelector(state => state.ui.timer.status);

    const playIcon = (status === 'playing') ? faPause : faPlay;

    const dispatch = useDispatch();

    return (
        <div id={id} className="controls">
            <IconButton id="play-pause"    icon={playIcon}      onClick={playPause} />
            <IconButton id="stop-timer"    icon={faStop}        onClick={stopTimer} />
            <IconButton id="next-timer"    icon={faStepForward} onClick={nextTimer} />
            <IconButton id="open-settings" icon={faEllipsisH}   onClick={showSettings} />
        </div>
    );
};

export default Controls;