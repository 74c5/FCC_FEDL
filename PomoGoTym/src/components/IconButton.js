import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles/IconButton.module.css';


const IconBtn = ({id, icon, onClick}) => {

    return (
        <button id={id} className={styles.iconButton} onClick={onClick}>
            <FontAwesomeIcon icon={icon} fixedWidth/>
        </button>
    );
};

export default IconBtn;