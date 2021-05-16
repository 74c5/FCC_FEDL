import { useDispatch, useSelector } from 'react-redux';
import { setMode, translate } from '../store/reducer';

import './Controls.scss';

const Controls = () => {
    const mode = useSelector(state => state.mode);

    const dispatch = useDispatch();

    const onModeChange = (event) => {
        event.preventDefault();
        dispatch(setMode(event.target.value))
    };

    const onClick = (event) => {
        event.preventDefault();
        dispatch(translate);
    }

    return (
        <div id="controls">
            <select value={mode} onChange={onModeChange}>
                <option value="interactive">Interactive Mode</option>
                <option value="manual">Manual Mode</option>
            </select>
            <button onClick={onClick}>update</button>
        </div>
    );
};

export default Controls;