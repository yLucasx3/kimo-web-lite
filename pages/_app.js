import { ToastContainer } from 'react-toastify';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { AuthProvider } from 'context/AuthContext';
import { SocketProvider } from 'context/SocketContext';

import 'react-toastify/dist/ReactToastify.css';
import 'styles/globals.css'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <Component {...pageProps}>
          <MessengerCustomerChat
              pageId="105137654636679"
              appId="330530065247617"
            />
          <ToastContainer autoClose={5000} style={{ padding: '0px', width: '500px' }} />
        </Component>
      </SocketProvider>
    </AuthProvider>
  );
}

export default MyApp;
