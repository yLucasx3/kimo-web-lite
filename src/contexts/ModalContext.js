import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        signInUp: false,
    });

    return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};

ModalProvider.propTypes = {
    children: PropTypes.node,
};

export { ModalContext, ModalProvider };
