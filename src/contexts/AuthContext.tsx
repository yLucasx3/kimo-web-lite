import React, { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const { isAuthenticated, loading, firstName, email, handleLogin, handleLogout } =
        useAuth();

    return (
        <AuthContext.Provider
            value={{
                loading,
                isAuthenticated,
                firstName,
                email,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
