import React from 'react';
import { useSelector } from 'react-redux';

import ProgressRing from './ProgressRing';
import SessionCounter from './SessionCounter';

import styles from '../styles/Clockface.module.css'

const Clockface = ({id}) => {
    const label = useSelector(state => state.timer.label);
    const value = useSelector(state => state.timer.value);

    const min   = String( Math.floor((value / 60000) % 60) ).padStart(2, '0');
    const sec   = String( Math.floor((value / 1000) % 60) ).padStart(2., '0');

    return (
        <div id={id} className={styles.clockFace} >
            <ProgressRing id={'progressRing'} width={300} stroke={5} />
            <div className={styles.inner}>
                <h3>{label}</h3>
                <div className={styles.timer}>
                    {min}<span className={styles.divider}>:</span>{sec}
                </div>
                <SessionCounter /> 
            </div>
        </div>
    );
};

export default Clockface;