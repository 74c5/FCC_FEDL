import { useDispatch, useSelector } from 'react-redux';
import { updateDisplay } from '../store/ui';
import { registerKey } from '../store/control';
// import { KEYMAP } from '../logic/controller'

import './Drumpad.scss';


const Drumpad = ({id}) => {
    const bankID = useSelector(store => store.ui.bankID);
    const banks = useSelector(store => store.ui.banks);
    const power = useSelector(store => store.control.power);
    const volume = useSelector(state => state.control.volume);
    const dispatch = useDispatch();
    
    const clipID = `${id}`;
    const padID  = `pad-${id}`;

    const playClip = () => {
        if (power === 'on') {
            const audio = document.querySelector(`#${clipID}`);
            const desc = audio.dataset.description;
            dispatch(updateDisplay(desc, 2000));
            //audio.load();
            audio.volume = volume;
            audio.play();
        }
    };


    const onClick = (event) => {
        event.preventDefault();
        playClip();
    }

    let src = '';
    let description = 'undefined description';
    if (bankID >= 0 && banks.length !== 0) {
        src = banks[bankID][id]['src'];
        description = banks[bankID][id]['desc'];
        dispatch(registerKey(id, playClip));
    }

    return (
        <button id={padID} className={`drum-pad ${power}`} onClick={onClick}>
            {id}
            <audio id={clipID} className='clip' src={src} data-description={description}>Audio Error</audio>
        </button>
        // <div id={padID} className={`drumpad ${power}`}>
        //     <button onClick={onClick}>{id}</button>
        //     <audio id={clipID} src={src} data-description={description}>Audio Error</audio>
        // </div>
    );
};

export default Drumpad;