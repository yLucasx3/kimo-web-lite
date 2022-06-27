import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from 'styles/pages/email/verify-email.styles';
import { Menu, Footer } from 'shared';
import { Warning } from 'components';
import { SocketContext } from 'contexts/SocketContext';
import api from 'api';

const Verify = () => {

  const socket = useContext(SocketContext);

  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    socket && socket.on('emailVerified', payload => {
      if (payload.verified) {
        router.push('/');
      } else {
        setMessage('Não foi possível realizar a confirmação, token inválido.');
      }
    });
  }, [socket]);

  useEffect(() => {
    setLoading(true);

    setTimeout(async () => {

      await api.users.confirmEmail(id);
      setLoading(false);

    }, 3000);
  }, []);

  return (
    <Container>
      <Menu />
      <Warning />
      <div className="confirm-message-container">
        <div className="confirm-message">
          {loading && <p>Verificando seu email...</p>}
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Verify;
