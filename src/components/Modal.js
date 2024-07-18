import React from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

function Modal({ show, handleClose, children }) {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className='d-felx justify-content-end'>
                <button onClick={handleClose} className="close-button">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                </div>
                {children}
            </section>
        </div>
    );
}

export default Modal;
