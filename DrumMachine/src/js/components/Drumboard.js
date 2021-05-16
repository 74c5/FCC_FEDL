// import { useDispatch, useSelector } from 'react-redux';
// import { setMode, translate } from '../store/reducer';
import Drumpad from './Drumpad';

import './Drumboard.scss';

const Drumboard = () => {
    // const mode = useSelector(state => state.mode);
    // const dispatch = useDispatch();

    return (
        <div id="drumboard">
            <Drumpad id="Q" />
            <Drumpad id="W" />
            <Drumpad id="E" />
            <Drumpad id="A" />
            <Drumpad id="S" />
            <Drumpad id="D" />
            <Drumpad id="Z" />
            <Drumpad id="X" />
            <Drumpad id="C" />
        </div>
    );
};

export default Drumboard;