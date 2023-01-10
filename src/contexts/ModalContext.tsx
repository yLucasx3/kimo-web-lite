import React, { createContext, ReactNode, useState } from 'react';

interface ModalProviderProps {
    children: ReactNode;
}

const ModalContext = createContext(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modal, setModal] = useState({
        signInUp: false,
    });

    return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
};

export { ModalContext, ModalProvider };
