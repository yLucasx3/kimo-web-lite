import React from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';

const Notification = ({ router, options }) => {
    return (
        <Container>
            <img src="https://i.imgur.com/48spIdP.png" alt="Chopper - One Piece" />
            <div>
                <div>
                    <span>Produto adicionado á sacola!</span>
                    <span className="msg-toast">
                        Continue comprando ou vá para sua sacola para finalizar sua compra.
                    </span>
                </div>
                <div className="button-finish">
                    <button onClick={() => router && router.push('/customerbag', [options])}>Finalizar </button>
                </div>
            </div>
        </Container>
    );
};

Notification.propTypes = {
    history: PropTypes.object,
    options: PropTypes.object,
};

export default Notification;
