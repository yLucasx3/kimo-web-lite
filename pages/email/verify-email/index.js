import React, { useContext, useEffect, useState } from 'react';
import { Footer } from 'shared/Footer';
import { Menu } from 'shared/Menu';
import { Warning } from 'components/Warning';
import { Container } from './styles';
import { useRouter } from 'next/router';
import { SocketContext } from 'context/SocketContext';
import api from 'api';

const VerifyEmail = () => {

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

export default VerifyEmail;
