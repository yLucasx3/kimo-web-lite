import React from 'react';
import { Container } from './styles';
import { FuelegonImage } from 'assets/images';
import Link from 'next/link';

const Banner = () => {
    return (
        <Container>
            <div className="banner-letter">
                <h1>
                    Roupas e<br /> acessórios
                    <br /> Otaku & Geek
                </h1>
                <Link href="/catalog">
                    <button className="btn-primary">checar agora</button>
                </Link>
            </div>
            <div className="banner-image">
                <FuelegonImage />
            </div>
        </Container>
    );
};

export default Banner;
