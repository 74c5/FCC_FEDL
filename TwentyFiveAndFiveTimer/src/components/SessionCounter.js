import React from 'react';
import { useSelector } from 'react-redux';

import styles from '../styles/SessionCounter.module.css';


const convertToTally = (counter) => {
    // The tally-count font uses custom glyphs to represent the tally '1-4' map to 'a-d' and we'll use 'e' for '5';
    if (counter == 0) return "g";

    const arr = Array(Math.floor(counter / 5)).fill('e');
    switch (counter % 5) {
        case 1: 
            arr.push('a');
            break;
        case 2: 
            arr.push('b');
            break;
        case 3: 
            arr.push('c');
            break;
        case 4: 
            arr.push('d');
            break;
        case 5: 
            arr.push('e');
            break;
        default:
            // do nowt.
    }
    return arr.join('');
};

const SessionCounter = ({id}) => {
    const counter = useSelector(state => state.timer.count);
    
    const tally = convertToTally(counter) || counter;

    return (
        <div id={id} className={styles.counter}>
            {tally}
        </div>
    );
};

export default SessionCounter;