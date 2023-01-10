import React from 'react';
import { Container } from 'styles/pages/home.styles';
import { Warning, Banner, Gallery } from 'components';
import { Menu, Footer, Newsletter } from 'shared';
import api from 'api';

const Home = ({ isMobile, products }) => {
    return (
        <Container>
            <Menu isMobile={isMobile} />
            <Warning message="Cupom de R$20 OFF em todo site! Utilize o cupom: KIMOOFF" />
            <Banner />
            <Gallery products={products} />
            <Newsletter />
            <Footer />
        </Container>
    );
};

export const getServerSideProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

    const isMobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

    const { products } = await api.products.list({ limit: 8 });

    return {
        props: {
            isMobile,
            products,
        },
    };
};

export default Home;
