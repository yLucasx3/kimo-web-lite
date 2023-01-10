import React from 'react';
import { Container } from './styles';

const Warning = ({ message }) => {
    return (
        <Container>
            <span> {message} </span>
        </Container>
    );
};

export default Warning;
