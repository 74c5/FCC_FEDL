import { useDispatch, useSelector } from 'react-redux';
import { updateDisplay } from '../store/ui';
import { registerKey } from '../store/control';
// import { KEYMAP } from '../logic/controller'

import './Drumpad.scss';
import store from '../store/store';

const Drumpad = ({id}) => {
    const bankID = useSelector(store => store.ui.bankID);
    const banks = useSelector(store => store.ui.banks);
    const power = useSelector(store => store.control.power);
    const volume = useSelector(state => state.control.volume);
    const dispatch = useDispatch();
    
    const clipID = `clip-${id}`;
    const padID  = `drumpad-${id}`;

    const playClip = () => {
        if (power === 'on') {
            const audio = document.querySelector(`#${clipID}`);
            const desc = audio.dataset.description;
            dispatch(updateDisplay(desc, 2000));
            audio.load();
console.log(`before: ${audio.volume}`);
            audio.volume = volume;
console.log(`after: ${audio.volume}`);
            audio.play();
        }
    };


    const onClick = (event) => {
        event.preventDefault();
        playClip();
    }

    let src = '';
    let description = 'undefined description';
    if (bankID >= 0 && banks.length != 0) {
        src = banks[bankID][id]['src'];
        description = banks[bankID][id]['desc'];
        dispatch(registerKey(id, playClip));
    }

    return (
        <div id={padID} className={`drumpad ${power}`}>
            <button onClick={onClick}>{id}</button>
            <audio id={clipID} src={src} data-description={description}>Audio Error</audio>
        </div>
    );
};

export default Drumpad;