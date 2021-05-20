import { useDispatch, useSelector } from 'react-redux';
import { registerKey, playClip } from '../store/control';
import './Drumpad.scss';


const Drumpad = ({id, clipID}) => {
    const bank = useSelector(store => store.ui.bank);
    const enabled = useSelector(store => store.ui.enabled);
    const dispatch = useDispatch();
    
    const onClick = (event) => {
        event.preventDefault();
        dispatch( playClip(clipID) )
    }

    let src = '';
    let description = 'undefined description';
    if (bank[clipID] !== undefined) {
        src = bank[clipID]['src'];
        description = bank[clipID]['desc'];
        dispatch(registerKey(clipID, playClip));
    }

    return (
        <button id={id} className={`drum-pad`} onClick={onClick} disabled={!enabled}>
            {clipID}
            <audio id={clipID} className='clip' src={src} data-description={description}>Audio Error</audio>
        </button>
    );
};

export default Drumpad;