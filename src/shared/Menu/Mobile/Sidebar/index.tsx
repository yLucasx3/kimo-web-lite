import React from 'react';
import { CloseIcon, PenIcon, UserIcon } from 'assets/icons';
import { Container } from './styles';
import { useRouter } from 'next/router';

const Sidebar = ({ options, handleClose }) => {
    const router = useRouter();

    const redirectTo = path => {
        router.push(path);
    };

    return (
        <Container>
            <div className="header">
                <h1>KIMOCHISM</h1>
                <span className="close-icon" onClick={() => handleClose()}>
                    <img src={CloseIcon} alt="Fechar menu" width={'24px'} />
                </span>
            </div>
            <div className="content">
                {options.map(option => {
                    return (
                        <span key={option.name} className="option-item" onClick={() => redirectTo(option.redirectTo)}>
                            <span className="option-icon">
                                <img src={option.icon} alt={option.label} width={'24px'} height={'24px'} />
                            </span>
                            <span>{option.label}</span>
                        </span>
                    );
                })}
            </div>
            <div className="footer">
                <span className="option-item">
                    <span className="option-icon">
                        <img src={PenIcon} alt="Sair" width={'24px'} height={'24px'} />
                    </span>
                    <span>Ajuda</span>
                </span>
                <span className="option-item">
                    <span className="option-icon">
                        <img src={UserIcon} alt="Sair" width={'24px'} height={'24px'} />
                    </span>
                    <span>Sair</span>
                </span>
            </div>
        </Container>
    );
};

export default Sidebar;
