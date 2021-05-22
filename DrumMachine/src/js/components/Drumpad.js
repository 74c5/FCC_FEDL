import { useSelector } from 'react-redux';
import { registerKey, playClip } from '../logic/controller';
import './Drumpad.scss';


const Drumpad = ({id, clipID}) => {
    const bank = useSelector(store => store.ui.bank);
    const enabled = useSelector(store => store.ui.enabled);
    
    const onClick = (event) => {
        event.preventDefault();
        playClip(clipID)
    }

    let src = '';
    let description = 'missing sound file';
    if (bank[clipID] !== undefined) {
        src = bank[clipID]['src'];
        description = bank[clipID]['desc'];
        registerKey(clipID);
    }

    return (
        <button id={id} className={`drum-pad`} onClick={onClick} disabled={!enabled}>
            {clipID}
            <audio id={clipID} className='clip' src={src} data-description={description}>Audio Error</audio>
        </button>
    );
};

export default Drumpad;