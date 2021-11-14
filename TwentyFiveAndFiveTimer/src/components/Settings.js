import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MODE_LIST, setSessionLimit, setShortBreakLimit, selectMode } from '../logic/settings';

import ValueIncrementer from './ValueIncrementer';
import ValueSelector from './ValueSelector';

import styles from '../styles/Settings.module.css';


const Settings = ({id}) => {
    const sessionTime = useSelector(state => state.settings.session.limit);
    const breakTime   = useSelector(state => state.settings.shortBreak.limit);
    const mode        = useSelector(state => state.settings.mode);

    //todo: extract only minutes from timer value

    return (
        <div id={id} className={styles.main}>
            <ValueIncrementer id={"setSessionTime"} title={"Session Time"} 
                              value={sessionTime} setValue={setSessionLimit}  />
            <ValueIncrementer id={"setBreakTime"} title={"Break Time"} 
                              value={breakTime} setValue={setShortBreakLimit} />
            <ValueSelector id={"modeSelector"} title={"Mode"} value={mode} 
                           selection={ MODE_LIST }
                           onChange={ selectMode } />
            {/* long Break */}
            {
            /* TODO:
            - colors 
                - background, text & buttons, clock face, clock dial
            - audio
                - choose sounds for session and break alarm (drop down);
            - Modes
                - continuous advance: timer runs, alarms, next timer starts
                - manual: timer runs, alarms, user starts next timer
                - auto increment: timer runs, alarms, without user intervention 'X' minutes are added to the timer until user selects next.
            */}
        </div>
    );
};

export default Settings;