import { useDispatch, useSelector } from 'react-redux';
import { setVolume } from '../store/control';

import './VolumeControl.scss';

const VolumeControl = () => {
    const volume = useSelector(state => state.control.volume);
    const power = useSelector(store => store.control.power);
    const dispatch = useDispatch();

    const onChange = (event) => {
        event.preventDefault();
        if (power === 'on') {
            dispatch(setVolume(Number(event.target.value)/11.0));
        }
    };

    const local = Math.round(volume*11);

    return (
        <div id='volume-panel' className={power}>
            <h3 className='volume-reading'>volume: <span>{local}</span></h3>
            <input type="range" id="volume" name="volume" className="volume-slider"
                   value={local} min={0} max={11} 
                   onChange={onChange}/>
        </div>
    );
};

export default VolumeControl;