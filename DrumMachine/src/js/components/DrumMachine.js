import useScreenSize from './useScreenSize';
import Display from './Display';
import Power from './Power';
import VolumeControl from './VolumeControl';
import BankSelect from './BankSelect';
import Drumpad from './Drumpad';

import './DrumMachine.scss';

const Drumboard = () => {
    const screen = useScreenSize();
    const viewClass = (screen.width < 450) ? 'mobileView' : 'fullView';

    return (
        <div id="drum-machine" className={viewClass}>
            <h3>I think, we need... more cow bell?</h3>
            <Display id="display"/>
            <Drumpad id="drumpad-Q" clipID="Q" />
            <Drumpad id="drumpad-W" clipID="W" />
            <Drumpad id="drumpad-E" clipID="E" />
            <Drumpad id="drumpad-A" clipID="A" />
            <Drumpad id="drumpad-S" clipID="S" />
            <Drumpad id="drumpad-D" clipID="D" />
            <Drumpad id="drumpad-Z" clipID="Z" />
            <Drumpad id="drumpad-X" clipID="X" />
            <Drumpad id="drumpad-C" clipID="C" />
            <Power id="power-switch"/>
            <VolumeControl id="volume-panel"/>
            <BankSelect id="bank-select"/>
        </div>
    );
};

export default Drumboard;