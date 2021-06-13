import { DISPLAYMAP, submitSymbol } from '../logic/controller';

import './Pad.scss';


const Pad = ({id, symbol}) => {
   
    const onClick = (event) => {
        event.preventDefault();
        submitSymbol(symbol);
    }

    return (
        <button id={id} className={`pad`} onClick={onClick}>
            {DISPLAYMAP.get(symbol).btnText}
        </button>
    );
};

export default Pad;