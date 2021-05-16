import useScreenSize from './useScreenSize';
import Display from './Display';
import Power from './Power';
import VolumeControl from './VolumeControl';
import BankSelect from './BankSelect';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMode, translate } from '../store/reducer';
import Drumpad from './Drumpad';

import './DrumMachine.scss';

const Drumboard = () => {
    const screen = useScreenSize();
    const viewClass = (screen.width < 450) ? 'mobileView' : 'fullView';

    return (
        <div id="drum-machine" className={viewClass}>
            <h3>I think, we need... more cow bell?</h3>
            <Display />
            <Drumpad id="Q" />
            <Drumpad id="W" />
            <Drumpad id="E" />
            <Drumpad id="A" />
            <Drumpad id="S" />
            <Drumpad id="D" />
            <Drumpad id="Z" />
            <Drumpad id="X" />
            <Drumpad id="C" />
            <Power />
            <VolumeControl />
            <BankSelect />
        </div>
    );
};

export default Drumboard;