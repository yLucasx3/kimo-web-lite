import { ToastContainer } from 'react-toastify';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { AuthProvider } from 'contexts/AuthContext';
import { SocketProvider } from 'contexts/SocketContext';
import { ModalProvider } from 'contexts/ModalContext';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <ModalProvider>
          <Component {...pageProps}>
            <MessengerCustomerChat
              pageId="105137654636679"
              appId="330530065247617"
            />
            <ToastContainer autoClose={5000} style={{ padding: '0px', width: '500px' }} />
          </Component>
        </ModalProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default MyApp;
