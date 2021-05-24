import React from 'react';
import { useSelector } from 'react-redux';
import './Display.scss';


const Display = ({id}) => {
    const text = useSelector(state => state.ui[id]);

    return (
        <div id={id} className={`display`}>{text}</div>
    );
};

export default Display;