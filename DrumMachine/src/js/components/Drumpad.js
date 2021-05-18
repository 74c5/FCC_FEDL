import { useDispatch, useSelector } from 'react-redux';
import { updateDisplay } from '../store/ui';
import { registerKey } from '../store/control';
// import { KEYMAP } from '../logic/controller'

import './Drumpad.scss';


const Drumpad = ({id}) => {
    const bank = useSelector(store => store.ui.bank);
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

    // console.log(`pad: ${id} with...`);
    // console.log(bank[id]);

    let src = '';
    let description = 'undefined description';
    if (bank[id] !== undefined) {
        // console.log(`pad bank is: ${bank}`);
        src = bank[id]['src'];
        description = bank[id]['desc'];
        dispatch(registerKey(id, playClip));
    }

    return (
        <button id={padID} className={`drum-pad ${power}`} onClick={onClick}>
            {id}
            <audio id={clipID} className='clip' src={src} data-description={description}>Audio Error</audio>
        </button>
    );
};

export default Drumpad;