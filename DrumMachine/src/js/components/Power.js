import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { togglePower } from '../store/control';

import './Power.scss';

const Power = () => {
    const power = useSelector(state => state.control.power);

    const dispatch = useDispatch();

    const onClick = (event) => {
        event.preventDefault();
        dispatch(togglePower);
    }

    return (
        <a id="power-switch" onClick={onClick} className={power}>
            <FontAwesomeIcon icon={faPowerOff}/>
        </a>
    );
};

export default Power;