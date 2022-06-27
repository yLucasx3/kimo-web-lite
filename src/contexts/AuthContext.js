import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

	const {
		isAuthenticated,
		loading,
		firstName,
		email,
		emailVerified,
		handleLogin,
		handleLogout,
		verifyEmail
	} = useAuth();

	return (
		<AuthContext.Provider value={{ loading, isAuthenticated, firstName, email, emailVerified, handleLogin, handleLogout, verifyEmail }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node
};

export { AuthContext, AuthProvider };