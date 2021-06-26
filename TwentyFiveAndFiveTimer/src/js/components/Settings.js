import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import { incrementSessionTime, decrementSessionTime, incrementBreakTime, decrementBreakTime, resetToDefaults } from '../logic/controller';
import './Settings.scss';


const Settings = ({id}) => {
    const sessionTime = useSelector(state => state.ui.session.limit);
    const breakTime   = useSelector(state => state.ui.break.limit);

    //todo: extract only minutes from timer value

    return (
        <div id={id} className="settings">
            <div>
                <h3>Session Time</h3>
                <p>
                    <IconButton id="inc-session" icon={faArrowUp}   onClick={incrementSessionTime} />
                    {sessionTime}
                    <IconButton id="dec-session" icon={faArrowDown} onClick={decrementSessionTime} />
                </p>
            </div>
            <div>
                <h3>Break Time</h3>
                <p>
                    <IconButton id="inc-session" icon={faArrowUp}   onClick={incrementBreakTime} />
                    {breakTime}
                    <IconButton id="dec-session" icon={faArrowDown} onClick={decrementBreakTime} />
                </p>
            </div>
            {/* long Break */}
            <div>
                <h3>Reset all: <IconButton id="reset-all" icon={} onClick={resetToDefaults}/></h3>
            </div>
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