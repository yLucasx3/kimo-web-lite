import React from 'react';
import { Container } from './styles';
import PropTypes from 'prop-types';

const NotificationError = ({ errorMessage }) => {
    return (
        <Container>
            <span>{errorMessage}</span>
        </Container>
    );
};

NotificationError.propTypes = {
    errorMessage: PropTypes.string,
};

export default NotificationError;
