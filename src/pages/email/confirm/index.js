import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Menu, Footer } from 'shared';
import { Warning } from 'components';
import { Container } from 'styles/pages/email/confirm-email.styles';
import { SocketContext } from 'contexts/SocketContext';

const ConfirmEmail = () => {

	const socket = useContext(SocketContext);
	const router = useRouter();

	useEffect(() => {
		socket && socket.on('emailVerified', payload => {
			if (payload.verified) {
				router.push('/');
			}
		});
	}, [socket]);

	return (
		<Container>
			<Menu />
			<Warning />
			<div className="confirm-message-container">
				<div className="confirm-message">
					<p>Enviamos um email para confirmação da sua conta, <br /> por favor verifique-o.</p>
				</div>
			</div>
			<Footer />
		</Container>
	);
};

export default ConfirmEmail;
