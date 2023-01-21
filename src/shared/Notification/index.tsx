import React from 'react';
import { Container } from './styles';

interface NotificationProps {
    router: any,
    options: any
}

const Notification = ({ router, options }: NotificationProps) => {
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

export default Notification;
