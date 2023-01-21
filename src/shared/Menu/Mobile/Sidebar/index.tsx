import React from 'react';
import { CloseIcon, PenIcon, UserIcon } from 'assets/icons';
import { Container } from './styles';
import { useRouter } from 'next/router';
import Image from 'next/image';

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
                    <CloseIcon />
                </span>
            </div>
            <div className="content">
                {options.map(option => {
                    return (
                        <span key={option.name} className="option-item" onClick={() => redirectTo(option.redirectTo)}>
                            <span className="option-icon">
                                <Image src={option.icon} alt={option.label} width={24} height={24} />
                            </span>
                            <span>{option.label}</span>
                        </span>
                    );
                })}
            </div>
            <div className="footer">
                <span className="option-item">
                    <span className="option-icon">
                        <PenIcon />
                    </span>
                    <span>Ajuda</span>
                </span>
                <span className="option-item">
                    <span className="option-icon">
                        <UserIcon />
                    </span>
                    <span>Sair</span>
                </span>
            </div>
        </Container>
    );
};

export default Sidebar;
