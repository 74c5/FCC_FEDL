import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Pad.scss';


const Pad = ({id, icon, onClick}) => {

    return (
        <button id={id} className={`icon-button`} onClick={onClick}>
            <FontAwesomeIcon icon={icon}/>
        </button>
    );
};

export default Pad;