import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { setVolume } from '../logic/controller';

import './VolumeControl.scss';

const VolumeControl = ({id}) => {
    const [vol, setVol] = useState(5);
    const enabled = useSelector(store => store.ui.enabled);

    const onChange = (event) => {
        event.preventDefault();
        const newVol = Number(event.target.value);
        setVol(newVol);
        setVolume(newVol/11.0);
    };

    return (
        <div id={id} className="volume-panel">
            <h3 className='volume-reading'>volume: <span>{vol}</span></h3>
            <input type="range" id="volume" name="volume" className="volume-slider" disabled={!enabled}
                   value={vol} min={0} max={11} onChange={onChange}/>
        </div>
    );
};

export default VolumeControl;