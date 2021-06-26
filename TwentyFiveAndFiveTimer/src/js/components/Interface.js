import Clockface from './Clockface';
import './Interface.scss';

const Interface = (id) => {
    return (
        <div id={id} class="interface">
            <h1>PomoGoTym</h1>
            <Clockface id="clock-face"/>
            <SessionCounter id="session-counter" />
            <Controls id="controls" />
        </div>
    );
};

export default Interface;