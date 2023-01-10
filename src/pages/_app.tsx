import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from '../contexts/AuthContext'
import { SocketProvider } from '../contexts/SocketContext'
import { ModalProvider } from '../contexts/ModalContext'
import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
      <SocketProvider>
      <ModalProvider>

      <Component {...pageProps}>

      <ToastContainer autoClose={5000} style={{ padding: '0px', width: '500px' }} />
      </Component>
      </ModalProvider>
      </SocketProvider>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
