import React, { ReactNode } from 'react';
import { StyledModal } from './styles';
import { CloseIcon } from 'assets/icons';

import Modal from 'react-modal';

interface BaseModalProps {
    children: ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    requestClose: boolean;
    showClose?: boolean;
    withBorder?: boolean;
    isTopScreen?: boolean;
    isCenterScreen?: boolean;
}

const BaseModal = ({
    children,
    isOpen,
    handleClose,
    showClose,
    requestClose,
    withBorder,
    isTopScreen,
    isCenterScreen,
}: BaseModalProps) => {
    Modal.setAppElement('#__next');

    // const customStyle = {
    //     overlay: {
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         zIndex: 999,
    //         backgroundColor: 'rgba(12, 12, 12, 0.5)',
    //         backdropFilter: 'blur(1px)',
    //     },
    // };

    return (
        <StyledModal
            isOpen={isOpen}
            withBorder={withBorder}
            isTopScreen={isTopScreen}
            isCenterScreen={isCenterScreen}
            // style={customStyle}
            onRequestClose={requestClose ? () => handleClose() : () => {}}
        >
            <div className="header">
                <span>Kimochism 気持ち</span>
                {showClose && (
                    <span onClick={() => handleClose()} className="close">
                        <img src={CloseIcon} alt="Fechar" />
                    </span>
                )}
            </div>
            <div className="content">{children}</div>
        </StyledModal>
    );
};

export default BaseModal;
