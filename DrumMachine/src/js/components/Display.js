import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateDisplay } from '../store/ui';
import './Display.scss';


const Display = () => {
    const {text, timeout} = useSelector(state => state.ui.display);
    const power = useSelector(state => state.control.power);

    const dispatch = useDispatch();
    
    // used to clear down this display.
    const clearDisplay = () => dispatch(updateDisplay(""));

    if (timeout > 0) {
        // set timeout, to clear down the text
        setTimeout(() => {
            //if the current text is equal to set 'text' (closure), then clear the text.
            const current = document.querySelector('#display').textContent;
            if (current === text) clearDisplay();
        }, timeout);
    }

    return (
        <div id="display" className={power}>{(power==='on')? text : ''}</div>
    );
};

export default Display;