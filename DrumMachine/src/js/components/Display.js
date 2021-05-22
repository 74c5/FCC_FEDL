import React from 'react';
import { useSelector } from 'react-redux';
import './Display.scss';


const Display = ({id}) => {
    const text = useSelector(state => state.ui.display);
    const enabled = useSelector(state => state.ui.enabled);

    const mode = (enabled)? 'enabled' : 'disabled';

    return (
        <div id={id} className={`display ${mode}`}>{text}</div>
    );
};

export default Display;