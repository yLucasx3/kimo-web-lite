import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Container } from './styles';
import { useRouter } from 'next/router';
import { ModalContext } from 'contexts/ModalContext';
import { AuthContext } from 'contexts/AuthContext';

const DesktopMenu = ({ options }) => {
    const router = useRouter();

    const { modal, setModal } = useContext(ModalContext);
    const { isAuthenticated } = useContext(AuthContext);

    const redirectTo = path => {
        if (path === '/profile' && !isAuthenticated) {
            setModal({ ...modal, signInUp: true });
            return;
        }

        router.push(path);
    };

    return (
        <Container>
            <h1 onClick={() => redirectTo('/')}>KIMOCHISM 気持ち</h1>
            <div className="options">
                {options.map(option => {
                    return (
                        <span key={option.name} onClick={() => redirectTo(option.redirectTo)}>
                            {option.label}
                            {option.showIcon && (
                                <span className="option-icon">
                                    <Image src={option.icon} alt={option.label} width={'22px'} />
                                </span>
                            )}
                        </span>
                    );
                })}
            </div>
        </Container>
    );
};

DesktopMenu.propTypes = {
    options: PropTypes.array.isRequired,
};

export default DesktopMenu;
