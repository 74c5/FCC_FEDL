import React from 'react';
import { useSelector } from 'react-redux';
import ProgressRing from './ProgressRing';
import './Clockface.scss';


const Clockface = ({id}) => {
    const timerLabel = useSelector(state => state.ui.timerLabel);
    const timerValue = useSelector(state => state.ui.timerValue);
    const timerPercent = useSelector(state => state.ui.timerPercent);

    //todo: extract only minutes or seconds from timer value for countdown
    const timerUnits = "m" // or s
    
    return (
        <div id={id} className="clock-face">
            <ProgressRing radius={60} stroke={4} percent={timerPercent} color="white" />
            <h3>{timerLabel}</h3>
            <p>{timerValue}<span className="timer-units">{timerUnits}</span></p>
        </div>
    );
};

export default Clockface;