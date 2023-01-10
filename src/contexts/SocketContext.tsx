import React, { createContext, ReactNode } from 'react';
import * as socketio from 'socket.io-client';
import { enviroment } from '../config/axios';
const { REACT_APP_API_URL } = process.env;

interface SocketProviderProps {
    children: ReactNode;
}

const socket = socketio.connect(REACT_APP_API_URL || enviroment.api_production);
const SocketContext = createContext(null);

const SocketProvider = ({ children }: SocketProviderProps) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
