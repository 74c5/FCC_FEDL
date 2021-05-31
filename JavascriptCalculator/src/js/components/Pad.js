import { submitSymbol } from '../logic/controller';
import './Pad.scss';


const Pad = ({id, symbol}) => {
   
    const onClick = (event) => {
        event.preventDefault();
        submitSymbol(symbol);
    }

    return (
        <button id={id} className={`pad`} onClick={onClick}>
            {symbol.btnText}
        </button>
    );
};

export default Pad;