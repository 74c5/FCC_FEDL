import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.scss';

/**
 * @param props: required {id, shown, hide(event), children}
 * @returns null || modal content: closeButton and children (centered)
 */
const Modal = (props) => {
    if (props.shown == false) {
        return null;
    }

    return (
        <div id={props.id} className="modal" onClick={hide}>
            <IconButton id="" icon={faTimes} onClick={hide} />
            {props.children}
        </div>
    );
};

export default Modal;