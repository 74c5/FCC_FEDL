import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import styles from '../styles/Modal.module.css';

const blockPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
}

/**
 * @param props: required {id, shown, hide(event), children}
 * @returns null || modal content: closeButton and children (centered)
 */
const Modal = ({id, shown, toggle, children}) => {
    if (shown == false) {
        return null;
    }
    
    const hideSettings = (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle();
    }

    return (
        <div id={id} className={styles.main} onClick={hideSettings}>
            <IconButton icon={faTimes} onClick={hideSettings} />
            <div className={styles.content} onClick={blockPropagation}>
                {children}
            </div>
        </div>
    );
};

export default Modal;