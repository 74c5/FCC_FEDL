import React from 'react';
import { useSelector } from 'react-redux';

import { ALARM_STATES } from '../store/store';


const Player = ({audioRef}) => {
    const status = useSelector(state => state.timer.alarm);
//console.log('player', audioRef, status);
    if (audioRef) { // only execute on client with valid audio ref?
        if (status == ALARM_STATES.reset) {
            audioRef.pause();

            //audioRef.load();

        } else if ( status == ALARM_STATES.alarm ) {
            audioRef.currrentTime = 0;
            audioRef.play();
        }
console.log('player', status, audioRef.currentTime, Date.now(), audioRef);
    }

    return ( null );
};

export default Player;