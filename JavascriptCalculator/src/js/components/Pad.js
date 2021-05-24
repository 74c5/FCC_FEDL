import { submitToken } from '../logic/controller';
import './Pad.scss';


const Pad = ({id, text, token}) => {
   
    const onClick = (event) => {
        event.preventDefault();
        submitToken(token);
    }

    return (
        <button id={id} className={`pad`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Pad;