import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { toggleEnable } from '../store/control';

import './Power.scss';

const Power = ({id}) => {
    const enabled   = useSelector(state => state.control.enabled);
    const uiEnabled = useSelector(state => state.control.enabled);

    const dispatch = useDispatch();

    const onClick = (event) => {
        event.preventDefault();
        dispatch(toggleEnable);
    }

    const power = (enabled)? 'on' : 'off';
    const mode  = (uiEnabled)? 'enabled' : 'disabled';

    return (
        <button id={id} onClick={onClick} className={`power-switch ${power} ${mode}`}>
            <FontAwesomeIcon icon={faPowerOff}/>
        </button>
    );
};

export default Power;