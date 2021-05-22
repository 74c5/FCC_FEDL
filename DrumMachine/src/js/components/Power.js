import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { setEnable } from '../logic/controller';
import './Power.scss';

const Power = ({id}) => {
    const enabled = useSelector(state => state.ui.enabled);
    const [power, setPower] = useState((enabled) ? 'on' : 'off');

    const onClick = (event) => {
        event.preventDefault();
        if (power === 'on') {
            setEnable(false);
            setPower('off');
        } else {
            setEnable(true);
            setPower('on');
        }
    }

    const mode  = (enabled) ? 'enabled' : 'disabled';

    return (
        <button id={id} onClick={onClick} className={`power-switch ${power} ${mode}`}>
            <FontAwesomeIcon icon={faPowerOff}/>
        </button>
    );
};

export default Power;